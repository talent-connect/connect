const app = require('../server/server');
const Rx = require('rxjs');
const { mergeMap, switchMap, tap } = require('rxjs/operators');
const { bindNodeCallback, from } = Rx;

const { RedUser } = app.models;

const emailOfUserToUpdate = '';

async function updatePassword(){
  const redUserInst = await RedUser.findOne({ where: { email: emailOfUserToUpdate } })
  console.log(redUserInst);
  await redUserInst.setPassword('')
}

updatePassword()
