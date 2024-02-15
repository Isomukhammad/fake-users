import { allFakers } from "@faker-js/faker";
import seedRandom, { PRNG } from "seedrandom";

import { alphabet } from "./constant.ts";
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

const times = (n: number, seed: PRNG): number => {
  let errors: number = Math.floor(n);
  const fractionalPart: number = n - errors;
  if (seed() < fractionalPart) {
    errors++;
  }
  return errors;
};

const getArrayItem = (seedRandomize: PRNG, array: string[]) => {
  const index = Math.floor(seedRandomize() * array.length);
  return array[index];
};

export const getRandomLetter = (country: string, seed: number): string => {
  const selectedAlphabet =
    country === "ru" ? alphabet.cyrillic : alphabet.latin;
  const seedRandomize = seedRandom(String(seed));
  const index = Math.floor(seedRandomize() * selectedAlphabet.length);
  return selectedAlphabet[index];
};

const chooseWhereErrors = (user: IFakeUserData, seedRandomize: PRNG) => {
  const keyWithErrors = getArrayItem(seedRandomize, [
    "name",
    "address",
    "phoneNumber",
  ]) as "name" | "address" | "phoneNumber";
  const valueWithErrors = user[keyWithErrors].split("");
  return { keyWithErrors, valueWithErrors };
};

const deleteSymbol = (user: IFakeUserData, seedRandomize: PRNG) => {
  const errors = chooseWhereErrors(user, seedRandomize);
  const letterToDelete = getArrayItem(seedRandomize, errors.valueWithErrors);
  const letterIndex = errors.valueWithErrors.indexOf(letterToDelete);
  errors.valueWithErrors.splice(letterIndex, 1);
  return {
    ...user,
    [errors.keyWithErrors]: errors.valueWithErrors.join(""),
  };
};

const addSymbol = (
  user: IFakeUserData,
  seedRandomize: PRNG,
  country: string,
) => {
  const errors = chooseWhereErrors(user, seedRandomize);
  const randomLetter = getRandomLetter(country, seedRandomize());
  const randomPosition = Math.floor(
    seedRandomize() * errors.valueWithErrors.length,
  );
  errors.valueWithErrors.splice(randomPosition, 0, randomLetter);
  return {
    ...user,
    [errors.keyWithErrors]: errors.valueWithErrors.join(""),
  };
};

const shiftSymbols = (user: IFakeUserData, seedRandomize: PRNG) => {
  const errors = chooseWhereErrors(user, seedRandomize);
  const wrongValue = errors.valueWithErrors;
  const randomValueIndex = Math.floor(seedRandomize() * wrongValue.length);

  if (randomValueIndex < wrongValue.length - 1) {
    const temp = wrongValue[randomValueIndex];
    wrongValue[randomValueIndex] = wrongValue[randomValueIndex + 1];
    wrongValue[randomValueIndex + 1] = temp;
  } else {
    const temp = wrongValue[randomValueIndex];
    wrongValue[randomValueIndex] = wrongValue[randomValueIndex - 1];
    wrongValue[randomValueIndex - 1] = temp;
  }

  return {
    ...user,
    [errors.keyWithErrors]: wrongValue.join(""),
  };
};

export const generateErrors = (
  user: IFakeUserData,
  state: IFakerState,
  seed: string,
) => {
  if (state.errors === 0) return user;

  console.log(seed);

  const newSeed = seedRandom(seed);
  const errorsNumber = times(state.errors, newSeed);
  let editedUser = user;
  for (let i = 0; i < errorsNumber; i++) {
    if (newSeed() <= 0.3) {
      editedUser = deleteSymbol(editedUser, newSeed);
    } else if (newSeed() > 0.3 && newSeed() <= 0.66) {
      editedUser = addSymbol(editedUser, newSeed, state.region);
    } else {
      editedUser = shiftSymbols(editedUser, newSeed);
    }
  }
  return editedUser;
};
