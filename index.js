let Odoo = require('./lib/Odoo')

async function main() {
    let odoo = new Odoo('http://localhost:8069', 'master', 'admin', 'admin')
    await odoo.connect()
    let response = await odoo.api.search('res.partner')
}

main()

module.exports = require('./lib/Odoo.js');