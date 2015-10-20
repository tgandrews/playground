var arp = require('node-arp');

arp.getMAC('172.18.43.80', function (err, mac) {
  console.log('Mac for 172.18.43.80 is ', mac);
})
