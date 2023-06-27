import Auth from './Auth.js'
import Client from './Client.js'

export default class Apidoo {
    constructor(url, db, user, pwd) {
        this.url = url
        this.db = db
        this.user = user
        this.pwd = pwd
        this.auth = {}
    }

    async connect() {
        this.auth = new Auth(this.url, this.db, this.user, this.pwd)
        await this.auth.login()
    }

    env(model) {
        return new Client(this.url, model)
    }
} 