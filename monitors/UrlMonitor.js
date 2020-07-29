const http = require('http');
const https = require('https');
const Ping = require('./Monitor');

const websites = [
  {
    id: 1234,
    title: 'google',
    url: 'https://www.google.com/',
    interval: 1,
    active: true,
    paused: false,
    totalDownTimes: null,
    lastDownTime: null,
    lastRequest: null,
  },
  {
    id: 12345,
    title: 'DNS',
    address: '127.0.0.1',
    port: '6463',
    interval: 1,
    active: true,
    paused: false,
    totalDownTimes: null,
    lastDownTime: null,
    lastRequest: null,
  },
];

const pingUrls = () => {
  websites.map((website) => {
    const monitor = new Ping({
      website: website.url,
      address: website.address,
      port: website.port,
      interval: website.interval,
    });

    monitor.on('up', (res) => {
      console.log(res.website + ' is UP');
    });

    monitor.on('down', (res) => {
      console.log(res.website + ' is Down');
    });

    monitor.on('pause', (res) => {
      console.log('Monitoring for ' + res.website + ' is Paused');
    });

    monitor.on('error', (res) => {
      console.log('Connection Error');
    });
  });
};

pingUrls();
