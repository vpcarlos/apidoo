import request from './request.js'
import { AuthError } from './exeptions.js'

export default class Auth {

    constructor(url, db, user, pwd) {
        this.url = url
        this.db = db
        this.user = user
        this.pwd = pwd
        this.session_info = {}
    }

    async login() {
        if (!await this.isValidSession()) {
            const response = await request(`${this.url}/web/session/authenticate`, 'POST', {
                'login': this.user,
                'db': this.db,
                'password': this.pwd
            })
            if (response.status != 200) {
                throw new AuthError('Error in authentication')
            }
            const session = await response.json()
            if (session.error) {
                if (session.error.data.name == 'odoo.exceptions.AccessDenied') {
                    throw new AuthError('Invalid login or password')
                }
                throw new AuthError(session.error.data.message)
            }
            this.session_info = session.result
        }
    }


    async isValidSession() {
        const response = await request(`${this.url}/web/session/get_session_info`, 'POST', {})
        if (response.status != 200) {
            return false
        }
        const session = await response.json()
        if (!session.result) {
            return false
        }
        this.session_info = session.result
        return true
    }
}
