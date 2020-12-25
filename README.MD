# Apidoo

Odoo API async requests

# Installing

Using npm:
```shell
$npm i apidoo --save
```

# Usage

```javascript
    // Establish connection
    let odoo = new Odoo('http://localhost:8069', 'db', 'user', 'password')
    await odoo.connect()

    // Search all partners
    let response = await odoo.api.search('res.partner')
```