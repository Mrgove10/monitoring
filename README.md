# Simple Monitoring application

# Status as of 14/05/2020

**[NetData](https://github.com/netdata/netdata/) Just did a great update to there cloud visualisation platform. And renders this project a little outdated. NetData is great and I have been using it for a while now. So this projet is now getting the tag :** [![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

Angular in electron : https://malcoded.com/posts/angular-desktop-electron/

Packaging electron app : https://medium.com/how-to-electron/a-complete-guide-to-packaging-your-electron-app-1bdc717d739f

## Samble client output

```json
{
  "hostname": "idefix",
  "version": "0.1.0",
  "uuid": "8d174a8d-940f-43b7-aa96-de382979ae4f",
  "data": {
    "load": {
      "avgload": 0.1,
      "currentload": 10.317460317460316,
      "currentload_user": 5.555555555555555,
      "currentload_system": 4.761904761904762,
      "currentload_nice": 0,
      "currentload_idle": 89.68253968253968,
      "currentload_irq": 0,
      "raw_currentload": 3900,
      "raw_currentload_user": 2100,
      "raw_currentload_system": 1800,
      "raw_currentload_nice": 0,
      "raw_currentload_idle": 33900,
      "raw_currentload_irq": 0,
      "cpus": [
        {
          "load": 13.541666666666666,
          "load_user": 7.291666666666667,
          "load_system": 6.25,
          "load_nice": 0,
          "load_idle": 86.45833333333334,
          "load_irq": 0,
          "raw_load": 1300,
          "raw_load_user": 700,
          "raw_load_system": 600,
          "raw_load_nice": 0,
          "raw_load_idle": 8300,
          "raw_load_irq": 0
        },
        {
          "load": 6.315789473684211,
          "load_user": 2.1052631578947367,
          "load_system": 4.2105263157894735,
          "load_nice": 0,
          "load_idle": 93.6842105263158,
          "load_irq": 0,
          "raw_load": 600,
          "raw_load_user": 200,
          "raw_load_system": 400,
          "raw_load_nice": 0,
          "raw_load_idle": 8900,
          "raw_load_irq": 0
        },
        {
          "load": 8.88888888888889,
          "load_user": 4.444444444444445,
          "load_system": 4.444444444444445,
          "load_nice": 0,
          "load_idle": 91.11111111111111,
          "load_irq": 0,
          "raw_load": 800,
          "raw_load_user": 400,
          "raw_load_system": 400,
          "raw_load_nice": 0,
          "raw_load_idle": 8200,
          "raw_load_irq": 0
        },
        {
          "load": 12.371134020618557,
          "load_user": 8.24742268041237,
          "load_system": 4.123711340206185,
          "load_nice": 0,
          "load_idle": 87.62886597938144,
          "load_irq": 0,
          "raw_load": 1200,
          "raw_load_user": 800,
          "raw_load_system": 400,
          "raw_load_nice": 0,
          "raw_load_idle": 8500,
          "raw_load_irq": 0
        }
      ]
    },
    "cpuspeed": {
      "min": 1.01,
      "max": 1.01,
      "avg": 1.01,
      "cores": [
        1.01,
        1.01,
        1.01,
        1.01
      ]
    },
    "cputemp": {
      "main": 58.564,
      "cores": [],
      "max": 58.564
    },
    "mem": {
      "total": 1014374400,
      "free": 86388736,
      "used": 927985664,
      "active": 523943936,
      "available": 490430464,
      "buffers": 115752960,
      "cached": 346292224,
      "slab": 70541312,
      "buffcache": 532586496,
      "swaptotal": 507183104,
      "swapused": 24117248,
      "swapfree": 483065856
    },
    "network": [
      {
        "iface": "wlx0011a30ab90c",
        "operstate": "up",
        "rx_bytes": 2322819391,
        "rx_dropped": 5756454,
        "rx_errors": 0,
        "tx_bytes": 2688745754,
        "tx_dropped": 5756458,
        "tx_errors": 0,
        "rx_sec": 14172.557172557174,
        "tx_sec": 437859.66735966736,
        "ms": 962
      }
    ],
    "uptime": 70453
  }
}
```