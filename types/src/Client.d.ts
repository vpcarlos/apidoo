export default class Client {
    constructor(url: any, model: any);
    url: any;
    model: any;
    context: {};
    call_kw(method: any, args: any, kwargs: any): Promise<any>;
    search(args?: any[][], kwargs?: {}): Promise<any>;
    search_count(args?: any[][], kwargs?: {}): Promise<any>;
    search_read(args?: any[][], kwargs?: {}): Promise<any>;
    read(args: any, kwargs?: {}): Promise<any>;
    get_fields(args?: any[], kwargs?: {}): Promise<any>;
    env(model: any): this;
    with_context(context: any): this;
}
