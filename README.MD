# Apidoo

Odoo API async requests

# Installing

Using npm:
```shell
$npm i apidoo --save
```
# Important
**If you are working with js framworks (react, vue, angular, svelte, etc) you need to integrate proxys**
<details markdown='1' open>
<summary>Vue JS</summary>

- Add the following 3 routes to the file **vite.config.js**

```javascript
export default defineConfig({
  ...
  server: {
    ...
    proxy: {
      ...
      '/web/session/authenticate': {
        target: 'http://localhost:8069/web/session/authenticate',
        rewrite: (path) => path.replace('/web/session/authenticate', ''),
      },
      '/web/session/get_session_info': {
        target: 'http://localhost:8069/web/session/get_session_info',
        rewrite: (path) => path.replace('/web/session/get_session_info', ''),
      },
      '/web/dataset/call_kw': {
        target: 'http://localhost:8069/web/dataset/call_kw',
        rewrite: (path) => path.replace('/web/dataset/call_kw', ''),
      },
     ...
    }
  }
})
```
</details>

<details>
<summary>React</summary>

- Install the package http-proxy-middleware (<code>$npm i http-proxy-middleware</code>)
- Create the file **setupProxy.js** inside src/ folder
- Restart the server

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

const session_info = {
    target: 'http://localhost:8069',
    changeOrigin: true
}
const authenticate = {
    target: 'http://localhost:8069',
    changeOrigin: true
}
const call_kw = {
    target: 'http://localhost:8069',
    changeOrigin: true
}

module.exports = function(app) {
  app.use(
    '/web/session/get_session_info',
    createProxyMiddleware(session_info)
  );

  app.use(
    '/web/session/authenticate',
    createProxyMiddleware(session_info)
  );
  app.use(
    '/web/dataset/call_kw', 
    createProxyMiddleware(call_kw)
  );
};
```
</details>

</details>

<details>
<summary>Angular</summary>

- WIP

</details>

# Usage

```javascript
    // You should pass an empty string as url because you already define the url in the proxy configuration
    import Apidoo from 'apidoo'
    let odoo = new Apidoo('', 'db', 'user', 'password')
    await odoo.connect()

    // Search all partners
    let partner = odoo.env('res.partner')
    let response = await parter.search()
```
# Methods

## Env and Context
```javascript
    // New res partner model env
    let partner = odoo.env('res.partner')

    // Search partners with a context
    let partner_ids = await partner.with_context({lang : 'es_ES'}).search()
    
```

## Search 

```javascript
    let partner = odoo.env('res.partner')

    // Search partner with a domain and attributes
    let partner_ids = await partner.search(
      [['active', '=', false]], 
      { limit: 2, offset: 1, order: 'name,email desc'}
    )

```

## Search Count

```javascript
    let partner = odoo.env('res.partner')

     // Count partners with a domain
    let partners_count = await partner.search_count([
      ['active', '=', false]]
    )

```
## Read

```javascript
    let partner = odoo.env('res.partner')

    // Search ative partners ids
    let partner_ids = await partner.search(
      [['active', '=', false]]
    )

    // Read fields name and title from partner_ids
    let partners = await partner.read(
      [partner_ids],
      { fields: ['name', 'title']}
    )

```

## Search Read

```javascript
    let partner = odoo.env('res.partner')

    // Search partner with a domain and get custom fields. This is a mix from Search and Read
    let partners = await partner.search_read(
      [['active', '=', false]], 
      { fields: ['name'] }
    )
  
```

## Get Fields

```javascript
    let partner = odoo.env('res.partner')

    // Get all fields from res.partner model
    let partner_fields_all = await partner.get_fields()

    // Get the the type ad string attributes from title field from res.partner model 
    let partner_fields = await partner.get_fields(
      ['title'],
      { attributes: ['type', 'string'] }
    )
   
```

# Session

```javascript
    import Apidoo from 'apidoo'
    // Get the session info
    let odoo = new Apidoo('', 'db', 'user', 'password')
    await odoo.connect()

    odoo.auth.session_info

```
