import { allFakers } from "@faker-js/faker";

import { IFakeUserData, IFakerState } from "./reducer.ts";

export const generateFakeUserData = (data: IFakerState): IFakeUserData => {
  const localeFaker = allFakers[data.region as "ru" | "en_US" | "es"];

  return {
    page: data.page,
    id: localeFaker.string.alpha(10),
    name: localeFaker.person.fullName(),
    address:
      localeFaker.location.state() +
      ", " +
      localeFaker.location.city() +
      ", " +
      localeFaker.location.street() +
      ", " +
      localeFaker.location.buildingNumber(),
    phoneNumber: localeFaker.phone.number(),
  };
};
