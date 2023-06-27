import request from './request.js';
import { objectIsEmpty } from './utils.js';
import { ClientError } from './exeptions.js';

export default class Client {
    constructor(url, model) {
        this.url = url;
        this.model = model;
        this.context = {}
    }

    async call_kw(method, args, kwargs) {

        if (!objectIsEmpty(this.context)) {
            kwargs = { ...kwargs, ...{ context: this.context } }
        }
        const response = await request(`${this.url}/web/dataset/call_kw`, 'POST', {
            model: this.model,
            method: method,
            args: args,
            kwargs: kwargs
        });
        if (response.status != 200) {
            throw new Error('Error in call_kw')
        }
        const data = await response.json()
        if (data.error) {
            if (data.error.data.name == 'builtins.KeyError') {
                throw new ClientError('Invalid model name: ' + this.model)
            }
            throw new ClientError(data.error.data.message)
        }
        return data.result;
    }

    async search(args = [], kwargs = {}) {

        return await this.call_kw('search', [args], kwargs);
    }

    async search_count(args = [[]], kwargs = {}) {
        return await this.call_kw('search_count', [args], kwargs);
    }

    async search_read(args = [[]], kwargs = {}) {
        return await this.call_kw('search_read', [args], kwargs)
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
