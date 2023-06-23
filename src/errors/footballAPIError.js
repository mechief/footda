import CustomError from "./customError";

class FootballAPIError extends CustomError {
  constructor(error) {
    super(error ?? 'Football API Error');
  }
}

export class NetworkError extends FootballAPIError {
  constructor() {
    super();
  }
}

export class NoResultError extends FootballAPIError {
  constructor() {
    super();
  }
}

export class NotFoundError extends FootballAPIError {
  constructor() {
    super();
  }
}