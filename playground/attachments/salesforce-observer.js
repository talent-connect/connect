const Rx = require('rxjs/Rx');
const redis = require('redis');
const jsforce = require('jsforce');

const util = require('util');

const loggers = require('./loggers');

function observe(salesforceApi, topicNames, rxSubject, env, logger = loggers.default) {
  if (salesforceApi == null) {
    throw new Error('Requires salesforceApi, a jsForce connection.');
  }
  if (! topicNames instanceof Array || topicNames.length < 1) {
    throw new Error('Requires array of topicNames.');
  }
  if (env == null || env.REDIS_URL == null) {
    throw new Error('Requires REDIS_URL env var.');
  }
  const redisClient = redis.createClient(env.REDIS_URL);
  redisClient.on("error", function (err) {
    logger(`redis error: ${err.stack}`);
    process.exit(1);
  });

  const exitCallback = () => process.exit(1);
  const authFailureExt = new jsforce.StreamingExtension.AuthFailure(exitCallback);
  const fayeClient = salesforceApi.streaming.createClient([ authFailureExt ]);

  return Promise.all(topicNames.map( topicName => {
    logger(`-----> Subscribing to Salesforce stream ${topicName}`);

    const replayKey = `replayId:${topicName}`;
    function saveReplayId(v) {
      return new Promise((resolve, reject) => {
        if (v != null) {
          redisClient.set(replayKey, v.toString(), (err, res) => {
            if (err) {
              reject(err);
            } else {
              logger(`       ⏺  Save checkpoint ${v}`);
              resolve(res);
            }
          }); 
        } else {
          resolve();
        }
      });
    }
    function readReplayId() {
      return new Promise((resolve, reject) => {
        if (env.REPLAY_ID != null) {
          resolve(env.REPLAY_ID);
        } else {
          redisClient.get(replayKey, (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          });
        }
      });
    }

    return readReplayId().then( v => {
      const replayId = v == null ? null : parseInt(v, 10);
      return subscribeAndPush(
        salesforceApi,
        fayeClient,
        topicName,
        replayId,
        saveReplayId,
        rxSubject,
        logger);
    })
  }));
}

function subscribeAndPush(
  salesforceApi,
  fayeClient,
  topicName,
  replayId,
  saveReplayId,
  rxSubject,
  logger
) {
  if (replayId != null) {
    logger(`       ⏮  Replaying from ${replayId}`);
    const replayExt = new jsforce.StreamingExtension.Replay(topicName, replayId);
    fayeClient.addExtension(replayExt);
  }
  logger(`       ▶️  Streaming changes`);
  fayeClient.subscribe(topicName, data => {
    try {
      const sObjectName = data.payload &&
        data.payload.ChangeEventHeader &&
        data.payload.ChangeEventHeader.entityName;

      // Broadcast the change
      rxSubject.next({
        type: sObjectName ? "change" : "event",
        name: sObjectName ? sObjectName : topicName,
        content: data
      });

      // Checkpoint at the new replayId
      return saveReplayId(data.event.replayId);

    } catch (err) {
      logger(`!      Changes subscription error: ${err.stack}`);
    }
  });
  return rxSubject;
}

/**
 * Log all incoming CometD messages
 */
const LoggingExtension = function(logger) {
  this.incoming = function(message, callback) {
    logger(`       👁‍🗨 message from Salesforce ${JSON.stringify(message)}`);
    callback(message);
  }
};

module.exports = observe;