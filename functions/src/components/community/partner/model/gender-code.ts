export enum GenderCode {
  UNDEFINED = 0,
  MALE = 1,
  FEMALE = 2
}

export function getGenderCode(roleType: number): number {
  switch(roleType) {
    case GenderCode.MALE: {
      return GenderCode.MALE;
      break;
    }
    case GenderCode.FEMALE: {
      return GenderCode.FEMALE;
      break;
    }
    default: {
      return GenderCode.UNDEFINED;
    }
  }
}
