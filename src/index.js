require('dotenv').config()
const axios = require('axios')
const client = require('twilio')(process.env.SID, process.env.TOKEN);



let globalStatus = ''
let errorOccured = false

const sendNotification = (status) => {
  client.messages
    .create({
      body: `PS5 status update:\n${status}`,
      from: `whatsapp:${process.env.TWILIO_PHONE}`,
      to: `whatsapp:${process.env.USER_PHONE}`
    })
    .then(message => {
      console.log(message.sid)
      console.log('[INFO] Sended notification: ', status)
    })
    .done();

}

const handleGetStatus = (status) => {
  if(globalStatus !== status) {
    globalStatus = status
    sendNotification(status)
  }
  else if (errorOccured) {
    console.log('Network up')
    console.log('PS5 status: ', status)
    errorOccured = false
  }
}

const fetchStatus = () => {
  axios.get(`https://www.mediaexpert.pl/order/status/check/${process.env.ORDER_ID}/${process.env.EMAIL}`)
    .then(res => {
      handleGetStatus(res.data.name)
    })
    .catch(err => {
      console.log('Network error')
      errorOccured = true
    })
}

setInterval(fetchStatus, process.env.INTERVAL)
