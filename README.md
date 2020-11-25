# Media Expert order tracer

## Install
``npm install``

## Config
Create `.env` file from `.env.template`

```shell script
SID= #SID from Twilio console
TOKEN= #TOKEN from Twilio console
EMAIL= #Your email address associated with order
ORDER_ID= #Your order ID
USER_PHONE= #Phone number on which notification will be sent
TWILIO_PHONE= #Phone number from Twilio console 
INTERVAL=2000 #Interval of checking status in milliseconds
```

## Run
`npm start`
