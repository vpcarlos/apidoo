
const fetch = require('node-fetch')

async function request(path, method, headers, parameters, all_response = false) {
    const default_body = {
        jsonrpc: '2.0',
        params: parameters
    }
    const default_headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    const response = await fetch(path, {
        method: method,
        credentials: 'same-origin',
        headers: { ...default_headers, ...headers },
        body: JSON.stringify(default_body)
    })
    if (all_response) {
        return response
    }

    let data = await response.json()
    if (data.hasOwnProperty('error')) {
        data.result = data.error.data
    }
    return data
}

module.exports = request