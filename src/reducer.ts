export interface IFakeUserData {
  page: number;
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
}

export interface IFakerState {
  list: IFakeUserData[];
  page: number;
  seed: number;
  region: string;
  errors: number;
}

export type IFakerActions =
  | {
      type: "SET_LIST";
      payload: IFakeUserData[];
    }
  | {
      type: "SET_PAGE";
      payload: number;
    }
  | {
      type: "SET_SEED";
      payload: number;
    }
  | {
      type: "SET_REGION";
      payload: string;
    }
  | {
      type: "SET_ERRORS";
      payload: number;
    };

export const fakerInitialState = {
  list: [],
  page: 1,
  seed: 0,
  region: "ru",
  errors: 0,
};

export const FAKER_ACTIONS = {
  SET_LIST: "SET_LIST" as const,
  SET_PAGE: "SET_PAGE" as const,
  SET_SEED: "SET_SEED" as const,
  SET_REGION: "SET_REGION" as const,
  SET_ERRORS: "SET_ERRORS" as const,
};

export const fakerReducer = (
  state: IFakerState,
  action: IFakerActions,
): IFakerState => {
  switch (action.type) {
    case FAKER_ACTIONS.SET_LIST:
      return { ...state, list: action.payload };
    case FAKER_ACTIONS.SET_PAGE:
      return { ...state, page: +action.payload };
    case FAKER_ACTIONS.SET_SEED:
      return {
        ...state,
        page: fakerInitialState.page,
        seed: +action.payload,
      };
    case FAKER_ACTIONS.SET_REGION:
      return {
        ...state,
        page: fakerInitialState.page,
        region: action.payload,
      };
    case FAKER_ACTIONS.SET_ERRORS:
      return {
        ...state,
        page: fakerInitialState.page,
        errors: +action.payload,
      };
    default:
      throw new Error();
  }
};
