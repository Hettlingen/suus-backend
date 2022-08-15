/**
 * @see https://umbraco.com/knowledge-base/http-status-codes/
 */
export enum ErrorHttpCodes {
  UNDEFINED = 0,
  OK = 200,
  BAD_REQUEST = 400,
  NOT_AUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500
}

export function getErrorCode(errorHttpCode: number): number {
  switch(errorHttpCode) {
    case ErrorHttpCodes.OK: {
      return ErrorHttpCodes.OK;
      break;
    }
    case ErrorHttpCodes.BAD_REQUEST: {
      return ErrorHttpCodes.BAD_REQUEST;
      break;
    }
    case ErrorHttpCodes.NOT_AUTHORIZED: {
      return ErrorHttpCodes.NOT_AUTHORIZED;
      break;
    }
    case ErrorHttpCodes.FORBIDDEN: {
      return ErrorHttpCodes.FORBIDDEN;
      break;
    }
    case ErrorHttpCodes.NOT_FOUND: {
      return ErrorHttpCodes.NOT_FOUND;
      break;
    }
    case ErrorHttpCodes.INTERNAL_SERVER: {
      return ErrorHttpCodes.INTERNAL_SERVER;
      break;
    }
    default: {
      return ErrorHttpCodes.UNDEFINED;
    }
  }
}
