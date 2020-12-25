let fetch = require('node-fetch')
let utils = require('./utils.js')

function Auth(url, db, user, pwd) {

    this.url = url
    this.db = db
    this.user = user
    this.pwd = pwd
}

Auth.prototype.login = async function () {
    const body = {
        jsonrpc: '2.0',
        params: {
            'login': this.user,
            'db': this.db,
            'password': this.pwd
        }
    }
    const response = await fetch(`${this.url}/web/session/authenticate`, {
        method: 'POST',
        mode: 'cors',
        jsonrpc: '2.0',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(body)
    })
    let data = await response.json()
    if (response.headers.has("Set-Cookie")) {
        data.result.session_id = utils.getCookie("session_id", response.headers.get('Set-Cookie'));
    }
    return data;
};

Auth.prototype.isValdidSession = async function () {
    let body = {
        jsonrpc: '2.0',
        params: {}
    }
    let response = await fetch(`${this.url}/web/session/get_session_info`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Openerp-Session-Id': this.session_id
        },
        body: JSON.stringify(body)
    })
    if (response.hasOwnProperty('error')) {
        return new Error('Invalid session')
    }
    return true

};

module.exports = Auth;