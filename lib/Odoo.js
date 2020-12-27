const Auth = require('./Auth')
const Client = require('./Client')

class Odoo {
    constructor(url, db, user, pwd) {
        this.url = url
        this.db = db
        this.user = user
        this.pwd = pwd
        this.auth = {}
        this.api = {}
    }
    async connect() {
        this.auth = new Auth(this.url, this.db, this.user, this.pwd)
        const data = await this.auth.login()
        this.api = new Client(data.result.session_id, this.url)
    }
}


module.exports = Odoo