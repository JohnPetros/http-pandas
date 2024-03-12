export const VALIDATION_ERRORS = {
  statusCode: {
    required: 'Status code is required',
    type: 'Status code must be a number',
    enum: 'Status code must be a real http status code, check it out: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
  },
}
