const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');
const { address } = require('./src/config');
const {decrypt, encrypt} = require('./src/utils');

const COMPACT_REGEXP = /\s+/g;
const compact = (str) => str.replace(COMPACT_REGEXP, ' ');
const myExec = (command) => {
    return new Promise((resolve, reject) => {
        exec(compact(command), (err, stdout, stderr) => {
            if (err) reject(err);
            else if (stderr) reject(stderr);
            else resolve(stdout);
        });
    })
}
const getUrl = (ip) => `http://${ip}:9527`;

const startToPush = (newAddress) => {
    const data = `module.exports = ${JSON.stringify({
        address: encrypt(newAddress)
    })}`
    fs.writeFileSync('./src/config.js', data);
    console.log('write file success')

    myExec(`./deploy.sh`).catch(console.log)
}

const getIp = () => {
    const ips = os.networkInterfaces()

    const wlan = ips['pppoe-wan']
    if (!wlan) {
        return null;
    }

    const ipV4 = wlan.find(v => v.family === 'IPv4')
    const oldAddress = decrypt(address);
    const newAddress = getUrl(ipV4.address);
    console.log('old address: ', oldAddress);
    console.log('new address: ', newAddress)
    if(!ipV4 || oldAddress === newAddress) {
        console.log('stop')
        return null;
    }
    return newAddress

}

const job = () => {
    console.log('start...')
    const newAddress = getIp()
    if (!newAddress) {
        return;
    }
    startToPush(newAddress)
}

job();
setInterval(() => {
    job();
}, 1800000)

