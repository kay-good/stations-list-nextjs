import { API_URL } from "./constants";

const dns = require('dns');
const util = require('util');
const resolveSrv = util.promisify(dns.resolveSrv);

let url: string | null = null;

export async function getApiBaseUrl() {
    if (url) {
        return url
    }

    const hosts = await resolveSrv(API_URL)
    if (!hosts) {
        return ""
    }
    const urls = []
    for (let i = 0; i < hosts.length; i++ ) {
        if (hosts[i].name) {
            urls.push("https://" + hosts[i].name)
        }
    }
    url = urls[Math.floor(Math.random() * urls.length)] ?? ""

    return url
}
