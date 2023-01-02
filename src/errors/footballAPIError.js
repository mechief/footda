import CustomError from "./customError";

class FootballAPIError extends CustomError {
  constructor() {
    super('Football API Error');
  }
}

export class NoResultError extends FootballAPIError {
  constructor() {
    super();
  }
}

export class NoResultNotFoundError extends FootballAPIError {
  constructor() {
    super();
  }
}