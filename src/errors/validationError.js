import CustomError from "./customError";

class ValidationError extends CustomError {}

export class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

export class InvalidParamError extends ValidationError {
  constructor(param) {
    super("Parameter " + param + " is invalid.");
    this.param = param;
  }
}