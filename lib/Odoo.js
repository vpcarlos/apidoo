let Auth = require('./Auth')
let Client = require('./Client')

function Odoo(url, db, user, pwd) {
    this.url = url
    this.db = db
    this.user = user
    this.pwd = pwd
    this.auth = {}
    this.api = {}
}

Odoo.prototype.connect = async function () {
    this.auth = new Auth(this.url, this.db, this.user, this.pwd)
    const data = await this.auth.login()
    this.api = new Client(data.result, this.url)
}

module.exports = Odoo