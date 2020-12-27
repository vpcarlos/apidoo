const utils = require('./utils')
const request = require('./request')

class Auth {

    constructor(url, db, user, pwd) {
        this.url = url
        this.db = db
        this.user = user
        this.pwd = pwd
        this.session_info = {}
    }

    async login() {
        const response = await request(`${this.url}/web/session/authenticate`, 'POST', {}, {
            'login': this.user,
            'db': this.db,
            'password': this.pwd
        }, true)
        let data = await response.json()
        if (response.headers.has("Set-Cookie")) {
            data.result.session_id = utils.getCookie("session_id", response.headers.get('Set-Cookie'))
        }
        if (!data.result.session_id) {
            return new Error('Invalid session')
        }
        this.session_info = data.result
        return data
    }

    async isValidSession() {
        let headers = { 'X-Openerp-Session-Id': this.session_info.session_id }
        return await request(`${this.url}/web/session/get_session_info`, 'POST', headers, {})
    }
}



module.exports = Auth;