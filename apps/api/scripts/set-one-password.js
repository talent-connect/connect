const app = require('../server/server')

const { RedUser } = app.models

const emailOfUserToUpdate = 'rene.grzeszick@motionminers.com'

async function updatePassword() {
  const redUserInst = await RedUser.findOne({
    where: { email: emailOfUserToUpdate },
  })
  console.log(redUserInst)
  await redUserInst.setPassword('yalla')
}

updatePassword()
