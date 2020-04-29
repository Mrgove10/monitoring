var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
    client.subscribe('2399ce45-7651-45a6-acaf-f8c5ca71180a', function (err) {
    })
})

client.on('message', function (topic, message) {
    console.log(message.toString())
})