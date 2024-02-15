import { allFakers } from "@faker-js/faker";
import { useInView } from "react-intersection-observer";

import { Dispatch, JSX, useEffect } from "react";

import { FAKER_ACTIONS, IFakerActions, IFakerState } from "../reducer.ts";
import { generateErrors, generateFakeUserData } from "../utils.ts";
import Table from "./Table.tsx";

interface ListProps {
  state: IFakerState;
  dispatch: Dispatch<IFakerActions>;
}

const List = ({ state, dispatch }: ListProps): JSX.Element => {
  const { ref: lastItemRef, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (state.page === 1)
      return dispatch({
        type: FAKER_ACTIONS.SET_LIST,
        payload: [...Array(20).keys()].map((index) => {
          const seed = `${state.page}${state.seed}${index}`;
          allFakers[state.region as "ru" | "en_US" | "es"].seed(+seed);

          const user = generateFakeUserData(state);
          return generateErrors(user, state, seed);
        }),
      });

    return dispatch({
      type: FAKER_ACTIONS.SET_LIST,
      payload: [
        ...state.list,
        ...[...Array(10).keys()].map((index) => {
          const seed = `${state.page}${state.seed}${index}`;
          allFakers[state.region as "ru" | "en_US" | "es"].seed(+seed);

          const user = generateFakeUserData(state);
          return generateErrors(user, state, seed);
        }),
      ],
    });
  }, [dispatch, state.page, state.seed, state.region, state.errors]);

  useEffect(() => {
    if (inView) {
      dispatch({ type: FAKER_ACTIONS.SET_PAGE, payload: state.page + 1 });
    }
  }, [inView]);

  return (
    <main className={"container mx-auto min-h-[calc(100vh-72px)] px-5 py-6"}>
      <div className={"overflow-x-scroll rounded-md bg-white p-4"}>
        <Table state={state} ref={lastItemRef} />
      </div>
    </main>
  );
};

export default List;
