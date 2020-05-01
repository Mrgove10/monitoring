#!/usr/bin/env node

const si = require('systeminformation');
const request = require('request');
const mqtt = require('mqtt')
const pjson = require('./package.json');
const firstRun = require('first-run');
const Configstore = require('configstore');
const { v4: uuidv4 } = require('uuid');

const config = new Configstore(pjson.name);
let verbose = false;


//Process arguments
if (process.argv.includes('-h') || process.argv.includes('--help')) {
    console.log("help");
    console.log("TODO");
    process.exit();
}

if (process.argv.includes('-r') || process.argv.includes('--reset')) {
    console.log("Resetting configuration");
    firstRun.clear();
    config.clear();
    console.log("Resetting done, exiting");
    process.exit();
}

if (process.argv.includes('-v') || process.argv.includes('--verbose')) {
    verbose = true;
}

//first run
if (firstRun()) {
    console.log("First Application run, setting up");
    config.set("machineUUID", uuidv4());
    console.log("Machine identifier : " + config.get("machineUUID"));
    GetgeoIpPostion();
}

// verbose mode
if (verbose) {
    console.log("Found Existing config :");
    console.log(config.all);
    console.log();
    console.log("Not first launch, starting program");
    console.log("Attemping connection to Mqtt Broker");
}

//main program
let machineUUID = config.get("machineUUID");
let geoIP = config.get("geoIP");
var client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', function () {
    if (!verbose) {
        const ora = require('ora');
        ora('Sending Data').start();
    }
    else {
        console.log("Connected to Mqtt broker")
    }

    setInterval(() => {
        si.cpuCurrentspeed((cpuSpeedData) => {
            si.cpuTemperature((cpuTempData) => {
                si.mem((memData) => {
                    si.osInfo((OSData) => {
                        si.networkStats(0, (netData) => {
                            si.currentLoad((loadData) => {
                                var data = {
                                    hostname: OSData.hostname,
                                    version: pjson.version,
                                    uuid: machineUUID,
                                    geoIP: geoIP,
                                    data: {
                                        load: loadData,
                                        cpuspeed: cpuSpeedData,
                                        cputemp: cpuTempData,
                                        mem: memData,
                                        network: netData,
                                        uptime: si.time().uptime
                                    }
                                }
                                if (verbose) {
                                    console.log(data);
                                }
                                client.publish('2399ce45-7651-45a6-acaf-f8c5ca71180a',
                                    JSON.stringify(data),
                                    (err) => {
                                        if (err) console.log(err)
                                    });
                            });
                        });
                    });
                });
            });
        });

    }, 1000);
});

setInterval(() => {
    GetgeoIpPostion();
}, 1000 * 3600 * 24);//get it once a day (for dynamic ip's)

function GetAllData() {
    si.cpuCurrentspeed((cpuSpeedData) => {
        si.cpuTemperature((cpuTempData) => {
            si.mem((memData) => {
                si.osInfo((OSData) => {
                    si.networkStats(0, (netData) => {
                        si.currentLoad((loadData) => {
                            var data = "gtgg"
                            //{
                            /* hostname: OSData.hostname,
                             version: pjson.version,
                             uuid: machineUUID
                             /*   geoIP: geoIP,
                                data: {
                                    load: loadData,
                                    cpuspeed: cpuSpeedData,
                                    cputemp: cpuTempData,
                                    mem: memData,
                                    network: netData,
                                    uptime: si.time().uptime
                                }*/
                            // }
                            if (verbose) {
                                console.log(data);
                            }
                            return data;
                        });
                    });
                });
            });
        });
    });
}

function GetgeoIpPostion() {
    if (verbose) {
        console.log("Getting IP Position")
    }
    request('http://www.ip-api.com/json/?fields=57794', function (error, response, body) {
        if (error === null) {
            let data = JSON.parse(body);
            if (data.status === "success") {
                if (verbose) {
                    console.log("Got GeoIP data !");
                    console.log(data);
                }
                delete data.status;
                config.set("geoIP", data);
            }
            else {
                if (verbose) {
                    console.log("Failed to get GeoIP data !");
                }
            }
        }
    });
}