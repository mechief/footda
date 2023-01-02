import CustomError from "./customError";

class ValidationError extends CustomError {}

export class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}