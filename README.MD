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

    // Search partners
    let partner = odoo.env('res.partner')
    let response = await parter.search()
```
# Methods

## Env and Context
```javascript
    // New res partner model env
    let partner = odoo.api.env('res.partner')

    // Search partners with a context
    let partner_ids = await partner.with_context({lang : 'es_ES'}).search()
    
```

## Search 

```javascript
    let partner = odoo.api.env('res.partner')

    /* Search partner with a domain and attributes */
    let partner_ids = await partner.search([[['active', '=', false]]], { limit: 2, offset: 1, order: 'name,email desc'})
    // [6,7]

    // Search all partners
    let partner_ids = await partner.search()
    // [5, 6, 7, 8]
```

## Search Count

```javascript
    let partner = odoo.api.env('res.partner')

     // Count partners with a domain
    let partners_count = await partner.search_count([[['active', '=', false]]])
    // 4
```
## Read

```javascript
    let partner = odoo.api.env('res.partner')

    // Search partners
    let partner_ids = await partner.search([[['active', '=', false]]])
    // [4, 6]

    // Read fields name and title from partner_ids
    let partners = await partner.read([partner_ids], { fields: ['name', 'title'] })
    /* 
    [{
        id: 6, 
        name: 'Portal User Template', 
        title: false 
    }, 
    { 
        id: 4, 
        name: 'Public user', 
        title: false
    }]
    */
```

## Search Read

```javascript
    let partner = odoo.api.env('res.partner')

    // Search partner with a domain and get custom fields. This is a mix from Search and Read
    let categories = await partner.search_read([[['active', '=', false]]], { fields: ['name'] })
      /* 
    [{
        id: 6, 
        name: 'Portal User Template', 
    }, 
    { 
        id: 4, 
        name: 'Public user', 
    }]
    */
```

## Get Fields

```javascript
    let partner_fields_all = await partner.get_fields()
    /*
    { 
      name:
        { 
          type: 'char',
          change_default: false,
          company_dependent: false,
          depends: [],
          manual: false,
          readonly: false,
          required: true,
          searchable: true,
          sortable: true,
          store: true,
          string: 'Name',
          translate: true,
          trim: true 
        },
      color:
        { 
          type: 'integer',
          change_default: false,
          company_dependent: false,
          depends: [],
          group_operator: 'sum',
          manual: false,
          readonly: false,
          required: false,
          searchable: true,
          sortable: true,
          store: true,
          string: 'Color Index' 
        },
     ...
    }
    */
    let partner_fields = await partner.get_fields(['title'], { attributes: ['type', 'string'] })
    /*
    { name: 
      { 
        type: 'char', 
        string: 'Name' 
      } 
    }
    */
```

# Auth

```javascript
 // Establish connection
    let odoo = new Odoo('http://localhost:8069', 'db', 'user', 'password')
    await odoo.connect()

    odoo.auth.session_info

    /* 
    { uid: 2,
     is_system: true,
     is_admin: true,
     user_context: { lang: 'es_ES', tz: false, uid: 2 },
     db: 'master13',
     server_version: '13.0+e',
     server_version_info: [ 13, 0, 0, 'final', 0, 'e' ],
     name: 'Administrator',
     username: 'admin',
     partner_display_name: 'Administrator',
     company_id: 1,
     partner_id: 3,
     'web.base.url': 'http://localhost:8069',
     user_companies: { current_company: [Array], allowed_companies: [Array] },
     currencies: { '1': [Object], '2': [Object] },
     show_effect: 'True',
     display_switch_company_menu: false,
     cache_hashes:
      { load_menus: '76b377632c2c9a04f80d9aeb4684465d3723158d',
        qweb: 'e45135167b9ad39817c3dd4710592ad01a61d62c',
        translations: '336e321c0ee524b1afd1aa73253cf3e2bd81be2b' },
     company_currency_id: 1,
     warning: 'admin',
     expiration_date: false,
     expiration_reason: false,
     web_tours: [],
     out_of_office_message: false,
     map_box_token: false,
     session_id: 'b45c6bc82fd9f0a0494f641b497983018c1e16d6' } }
     */
```
