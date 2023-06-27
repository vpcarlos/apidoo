export default class Auth {
    constructor(url: any, db: any, user: any, pwd: any);
    url: any;
    db: any;
    user: any;
    pwd: any;
    session_info: {};
    login(): Promise<void>;
    isValidSession(): Promise<boolean>;
}
