export interface IValidationProvider {
  validateStatusCode(statusCode: number): Promise<void>
}
