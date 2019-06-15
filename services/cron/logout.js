const CronJob = require('cron').CronJob;
const user = require('../../server/models').user;

module.exports = {
  logoutUser() {
    new CronJob('0 0 0 * * *', async function() {
      try {
        const userData = await user.findAll()
        userData.map(data => {
          user.update({
            cookies: null
          }, {
            where: {
              id: data.id
            }
          })
        })
      } catch(error) {
        console.log("error logout user ==>", error)
      }
    }, null, true, 'Asia/Bangkok')
  },
}
