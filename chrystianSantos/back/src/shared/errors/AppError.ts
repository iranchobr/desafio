class AppError {
  // readonly nao permite eu alterar a info da seguinte maneira error.message='asd'

  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
