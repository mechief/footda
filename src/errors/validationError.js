import CustomError from "./customError";

class ValidationError extends CustomError {}

export class MissingRequiredParamError extends ValidationError {
  constructor(param) {
    super("Missing required parameter: " + param);
    this.param = param;
  }
}

export class InvalidParamError extends ValidationError {
  constructor(param) {
    super("Parameter " + param + " is invalid.");
    this.param = param;
  }
}