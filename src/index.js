require('dotenv').config()
const moment = require('moment')
const axios = require('axios')
const client = require('twilio')(process.env.SID, process.env.TOKEN);



let globalStatus = ''
let globalDate = ''
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

const handleGetStatus = ({status, datetime}) => {
  if(globalDate !== datetime) {
    globalStatus = status
    globalDate = datetime
    sendNotification(`${status}  ${moment(datetime).format('HH:MM:SS')}`)
  }
  else if (errorOccured) {
    console.log('Network up')
    console.log('PS5 status: ', status)
    errorOccured = false
  }
}

const fetchStatus = () => {
  // axios.get(`https://www.mediaexpert.pl/order/status/check/${process.env.ORDER_ID}/${process.env.EMAIL}`)
  axios.get(`https://inpost.pl/shipx-proxy/?number=521000019641922002850531`, {headers: {
    'X-Requested-With': 'XMLHttpRequest'
    }})
    .then(res => {
      if(res.data.tracking_details) {
        handleGetStatus(res.data.tracking_details[0])
      }
    })
    .catch(err => {
      console.log('Network error')
      errorOccured = true
    })
}

setInterval(fetchStatus, process.env.INTERVAL)
