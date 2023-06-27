export class AuthError extends Error {
    constructor(message) {
      super(message); 
      this.name = "AuthError";
    }
  }

export class ClientError extends Error {
    constructor(message) {
      super(message); 
      this.name = "ClientError";
    }
}