const WebSocket = require('ws');
const si = require('systeminformation');

const wss = new WebSocket.Server({ port: 1596 });

wss.on('connection', function connection(ws) {
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
                                ws.send(JSON.stringify(data));
                            });
                        });
                    });
                });
            });
        });
    }, 1000);
});