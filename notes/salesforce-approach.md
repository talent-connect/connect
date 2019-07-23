# Salesforce subscription approach
## TL;DR: 
Replay salesforce platform events using rxjs, jsforce, redis. [Trailhead](https://trailhead.salesforce.com/en/content/learn/modules/api_basics/api_basics_streaming). [Reference example](./attachments/salesforce-observer.js). [GitHub repository implementing lots of salesforce stuff](https://github.com/mars/event-driven-functions).

## Main options
See: https://developer.salesforce.com/docs/atlas.en-us.api_streaming.meta/api_streaming/event_comparison.htm

* PushTopic Event
* Change Data Capture Event
* Platform Event
* Generic Event

Blog post exploring the issue of choosing the right one: https://developer.salesforce.com/blogs/2018/07/which-streaming-event-do-i-use.html

Another one, more detailed: https://www.trineo.co.nz/blog/2019/04/push-vs-cdc

Differences:
>PushTopic events are published when a Salesforce record changes as a result of create, update, delete, or undelete operations. Alternatively, you can publish arbitrary data and subscribe to the stream of data using platform events or generic events.

## Resources
* [YouTube video showing how to use jsforce](https://www.youtube.com/watch?v=jodb2NHpkWk)
* [Trailhead about Streaming API](https://trailhead.salesforce.com/en/content/learn/modules/api_basics/api_basics_streaming)
* [Inspiration: GitHub repository that heavily makes use of jsforce](https://github.com/mars/event-driven-functions)
* [Salesforce: Streaming API Developer Guide - Message Durability (about replay functionality of messages in a channel)](https://developer.salesforce.com/docs/atlas.en-us.api_streaming.meta/api_streaming/using_streaming_api_durability.htm)
* [Salesforce: Streaming API - key terms](https://developer.salesforce.com/docs/atlas.en-us.api_streaming.meta/api_streaming/terms.htm)
* [Step-by-step guide on how to configure Push Topics](https://docs.cxengage.net/Help/Content/Configuration/Integrations/Email/Salesforce/Workbench_PushTopics.htm)

## Detail

This merged jsforce [pull request](https://github.com/jsforce/jsforce/pull/740) contains an enlightening comment. It mentions that:
>  Each individual app will still need to *implement persistent storage to capture and recall the last seen replayId*. For example, here's an app that uses Redis to track the last processed ID using this pull request's fork/branch: https://github.com/mars/event-driven-functions/blob/master/lib/salesforce-observer.js

The source code in `salesforce-observer.js` has roughly this modus operandi:

```
observe(sfApi, ['topic1', 'topic2'], rxSubject)

one promise created per topic

fayeClient = salesforceApi.streaming.createClient()

topic promise sequence:
1. lastTopicReplayId = gotten from redis
2. replayExt = request to replay starting at :lastTopicReplayId in topic
3. registering subscriber, executes for EACH event
3a. broadcasts event via RxSubject { type, name, content }
3b. saves replayId
```
The same logic is a promising approach to use for redcon.

