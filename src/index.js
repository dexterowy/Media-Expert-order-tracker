require('dotenv').config()
const axios = require('axios')
const client = require('twilio')(process.env.SID, process.env.TOKEN);



let globalStatus = ''

const sendNotification = (status) => {
  client.messages
    .create({
      body: `PS5 status update:\n${status}`,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+48693226902'
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
  axios.get('https://www.mediaexpert.pl/order/status/check/02314291095/mateusz.szczotarz%40gmail.com')
    .then(res => {
      handleGetStatus(res.data.name)
    })
}

setInterval(fetchStatus, 2000)
