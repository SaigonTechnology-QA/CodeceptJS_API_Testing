const Helper = require('@codeceptjs/helper');

class Api extends Helper {

  _init() {
    super._init()
  }

  constructor(config) {
    super(config)
    this.config = config
  }

  async sendGet(url, headers = {}, timeout = 10000) {
    await this.helpers['REST'].setRequestTimeout(timeout)
    return await this.helpers['REST'].sendGetRequest(url, headers)
  }

  async sendPost(url, payload = {}, headers = {}, timeout = 10000) {
    await this.helpers['REST'].setRequestTimeout(timeout);
    return await this.helpers['REST'].sendPostRequest(url, payload, headers);
  }

  async sendPut(url, body = {}, headers = {}, timeout = 10000) {
    await this.helpers['REST'].setRequestTimeout(timeout)
    return await this.helpers['REST'].sendPutRequest(url, body, headers)
  }

  async sendDelete(url, headers = {}, timeout = 10000) {
    await this.helpers['REST'].setRequestTimeout(timeout)
    return await this.helpers['REST'].sendDeleteRequest(url, headers)
  }

}

module.exports = Api;
