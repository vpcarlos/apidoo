let fetch = require('node-fetch')

function Client(session_info, url) {
    this.session_info = session_info
    this.url = url
}

Client.prototype.search = async function (model, args = [[]], kwargs = {}) {
    const body = {
        params: {
            model: model,
            method: 'search',
            args: args,
            kwargs: kwargs
        }
    };

    let response = await fetch(`${this.url}/web/dataset/call_kw`, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Openerp-Session-Id': this.session_info.session_id
        },
        body: JSON.stringify(body)
    });
    let data = await response.json()
    return data.result;
}
module.exports = Client
