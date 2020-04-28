const si = require('systeminformation');
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {

    const ora = require('ora');

    const spinner = ora('Sendig Data').start();

    setInterval(() => {
        si.cpuCurrentspeed((cpuSpeedData) => {
            si.cpuTemperature((cpuTempData) => {
                si.mem((memData) => {
                    si.osInfo((OSData) => {
                        si.networkStats(0, (netData) => {
                            si.currentLoad((loadData) => {
                                let data =
                                {
                                    hostname: OSData.hostname,
                                    data: {
                                        load: loadData,
                                        cpuspeed: cpuSpeedData,
                                        cputemp: cpuTempData,
                                        mem: memData,
                                        network: netData,
                                        uptime: si.time().uptime
                                    }
                                }
                                client.publish('2399ce45-7651-45a6-acaf-f8c5ca71180a', JSON.stringify(data));
                            });
                        });
                    });
                });
            });
        });
    }, 1000);
});