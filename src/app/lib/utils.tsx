const dns = require('dns');
const util = require('util');
const resolveSrv = util.promisify(dns.resolveSrv);

export async function getUrl() {
    const hosts = await resolveSrv("_api._tcp.radio-browser.info")
    if (!hosts) {
        return ""
    }
    const urls = []
    for (let i = 0; i < hosts.length; i++ ) {
        if (hosts[i].name) {
            urls.push("https://" + hosts[i].name)
        }
    }

    return urls[Math.floor(Math.random() * urls.length)] ?? ""
}
