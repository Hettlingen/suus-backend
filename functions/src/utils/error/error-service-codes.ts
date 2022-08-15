export enum ErrorServiceCodes {
  UNDEFINED = 0,
  NO_ITEMS_FOUND_ON_DATABASE = 1 ,
  BAD_USERNAME = 2,
  NOT_AUTHORIZED = 3,
  USER_ACCOUNT_ALREADY_EXISTING = 4,
  USER_ACCOUNT_NOT_CREATED = 5
}

export interface ErrorServiceCodeItem {
  errorCode: number,
  description: string
}

export function getErrorCode(errorServiceCode: number): ErrorServiceCodeItem {
  switch(errorServiceCode) {
    case ErrorServiceCodes.NO_ITEMS_FOUND_ON_DATABASE: {
      return {errorCode:1, description: 'No items found on database: '};
      break;
    }
    case ErrorServiceCodes.BAD_USERNAME: {
      return {errorCode:2, description: 'Wrong user-name or password: '};
      break;
    }
    default: {
      return {errorCode:0, description: 'Undefined error'};
    }
  }
}
