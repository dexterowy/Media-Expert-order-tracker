require('dotenv').config()
const axios = require('axios')
const client = require('twilio')(process.env.SID, process.env.TOKEN);



let globalStatus = ''

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
}

const fetchStatus = () => {
  axios.get(`https://www.mediaexpert.pl/order/status/check/${process.env.ORDER_ID}/${process.env.EMAIL}`)
    .then(res => {
      handleGetStatus(res.data.name)
    })
}

setInterval(fetchStatus, process.env.INTERVAL)
