export default class Apidoo {
    constructor(url: any, db: any, user: any, pwd: any);
    url: any;
    db: any;
    user: any;
    pwd: any;
    auth: {};
    connect(): Promise<void>;
    env(model: any): Client;
}
import Client from './Client.js';
