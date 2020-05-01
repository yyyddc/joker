const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');
const { address } = require('./src/config')
const {decrypt, encrypt} = require('./src/utils')

const COMPACT_REGEXP = /\s+/g;
const compact = (str) => str.replace(COMPACT_REGEXP, ' ');
const myexec = (command) => {
    return new Promise((resolve, reject) => {
        exec(compact(command), (err, stdout, stderr) => {
            if (err) reject(err);
            else if (stderr) reject(stderr);
            else resolve(stdout);
        });
    })
}
const getUrl = (ip) => `http://${ip}:9527`;

const startToPush = (ip) => {
    console.log(ip)
    const data = `module.exports = ${JSON.stringify({
        address: encrypt(getUrl(ip))
    })}`
    fs.writeFileSync('domain.json', data);
    console.log('write file success')

    myexec(`./deploy.sh`).catch(console.log)
}

const getIp = () => {
    const ips = os.networkInterfaces()

    const wlan = ips['pppoe-wan']
    if (!wlan) {
        return null;
    }

    const ipV4 = wlan.find(v => v.family === 'IPv4')
    if(!ipV4 || decrypt(address) === getUrl(ipV4.address)) {
        console.log('stop')
        return null;
    }
    return ipV4.address

}

const job = () => {
    console.log('start...')
    const ip = getIp()
    if (!ip) {
        return;
    }
    startToPush(ip)
}

job();
setInterval(() => {
    job();
}, 1800000)

