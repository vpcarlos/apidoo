const request = require('./request');
const utils = require('./utils')
class Client {

    constructor(session_id, url) {
        this.session_id = session_id;
        this.url = url;
        this.model = ""
        this.context = {}
    }

    async call_kw(method, args, kwargs) {
        const headers = {
            'X-Openerp-Session-Id': this.session_id
        };

        if (!utils.objectIsEmpty(this.context)) {
            kwargs = { ...kwargs, ...{ context: this.context } }
        }
        const response = await request(`${this.url}/web/dataset/call_kw`, 'POST', headers, {
            model: this.model,
            method: method,
            args: args,
            kwargs: kwargs
        });
        return response.result;
    }

    async search(args = [[]], kwargs = {}) {
        return await this.call_kw('search', args, kwargs);
    }

    async search_count(args = [[]], kwargs = {}) {
        return await this.call_kw('search_count', args, kwargs);
    }

    async search_read(args = [[]], kwargs = {}) {
        return await this.call_kw('search_read', args, kwargs)
    }

    async read(args, kwargs = {}) {
        return await this.call_kw('read', args, kwargs)
    }

    async get_fields(args = [], kwargs = {}) {
        return await this.call_kw('fields_get', args, kwargs)
    }

    env(model) {
        this.model = model
        return this
    }

    with_context(context) {
        this.context = context
        return this
    }
}

module.exports = Client
