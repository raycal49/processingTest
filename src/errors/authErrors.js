export class InvalidCredentialError extends Error {
  constructor(options) {
    super("Invalid username and/or password", options);        // sets message + handles cause
    this.name = "InvalidCredential";  // otherwise it lies and says "Error"
    this.statusCode = 401; // 401 - unauthorized
  }
}

export class AccountAlreadyExistsError extends Error {
  constructor(options) {
    super("Account with this username already exists", options);        // sets message + handles cause
    this.name = "UsernameTaken";  // otherwise it lies and says "Error"
    this.statusCode = 409; // 409 - conflict i think
  }
}

export class ValidationError extends Error {
  constructor(fields, options) {
    super("A field or fields contain invalid input", options);
    this.name = "ValidationError";
  }
}