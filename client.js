const io = require("socket.io-client");
const si = require('systeminformation');
const os = require('os');
const ora = require('ora');

const server = io.connect("http://localhost:3000");
const spinner = ora("Sending Data").start();

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
                                    load : loadData,
                                    cpuspeed: cpuSpeedData,
                                    cputemp: cpuTempData,
                                    mem: memData,
                                    network: netData,
                                    uptime: si.time().uptime
                                }
                            }
                            server.emit('data', JSON.stringify(data));
                        });
                    });
                });
            });
        });
    });
}, 1000);