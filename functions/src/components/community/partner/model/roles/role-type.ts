export enum RoleType {
  UNDEFINED = 0,
  ROLE_USER = 1,
  ROLE_CUSTOMER = 2,
  ROLE_PRODUCER = 3,
  ROLE_DELIVERER = 4
}

export function getRoleType(roleType: number): number {
  switch(roleType) {
    case RoleType.ROLE_USER: {
      return RoleType.ROLE_USER;
      break;
    }
    case RoleType.ROLE_CUSTOMER: {
      return RoleType.ROLE_CUSTOMER;
      break;
    }
    case RoleType.ROLE_PRODUCER: {
      return RoleType.ROLE_PRODUCER;
      break;
    }
    case RoleType.ROLE_DELIVERER: {
      return RoleType.ROLE_DELIVERER;
      break;
    }
    default: {
      return RoleType.UNDEFINED;
    }
  }
}
