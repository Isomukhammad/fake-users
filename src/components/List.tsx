import { allFakers } from "@faker-js/faker";
import { useInView } from "react-intersection-observer";

import { Dispatch, JSX, useEffect } from "react";

import { FAKER_ACTIONS, IFakerActions, IFakerState } from "../reducer.ts";
import { generateFakeUserData } from "../utils.ts";

interface ListProps {
  state: IFakerState;
  dispatch: Dispatch<IFakerActions>;
}

const List = ({ state, dispatch }: ListProps): JSX.Element => {
  const { ref: lastItemRef, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const seed = +(String(state.seed) + String(state.page));
    allFakers[state.region as "ru" | "en_US" | "es"].seed(seed);

    if (state.page === 1)
      return dispatch({
        type: FAKER_ACTIONS.SET_LIST,
        payload: [...Array(20).keys()].map(() => generateFakeUserData(state)),
      });

    const list = [...Array(10).keys()].map(() => generateFakeUserData(state));

    return dispatch({
      type: FAKER_ACTIONS.SET_LIST,
      payload: [...state.list, ...list],
    });
  }, [dispatch, state.page, state.seed, state.region]);

  useEffect(() => {
    if (inView) {
      dispatch({ type: FAKER_ACTIONS.SET_PAGE, payload: state.page + 1 });
    }
  }, [inView]);

  return (
    <main className={"container mx-auto min-h-[calc(100vh-72px)] px-5 py-6"}>
      <div className={"rounded-md bg-white p-4"}>
        <table className={"w-full table-fixed rounded-md border bg-white"}>
          <thead>
            <tr>
              <td className={"border p-1 font-medium"}>Number</td>
              <td className={"border p-1 font-medium"}>ID</td>
              <td className={"border p-1 font-medium"}>Full Name</td>
              <td className={"border p-1 font-medium"}>Address</td>
              <td className={"border p-1 font-medium"}>Phone Number</td>
            </tr>
          </thead>
          <tbody>
            {state.list.map((item, index) => {
              if (index + 1 === state.list.length) {
                return (
                  <tr
                    key={item.id}
                    ref={lastItemRef}
                    className={index % 2 === 0 ? "bg-neutral-100" : ""}
                  >
                    <td className={"border p-1"}>{index + 1}</td>
                    <td className={"border p-1"}>{item.id}</td>
                    <td className={"border p-1"}>{item.name}</td>
                    <td className={"border p-1"}>{item.address}</td>
                    <td className={"border p-1"}>{item.phoneNumber}</td>
                  </tr>
                );
              }
              return (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-neutral-100" : ""}
                >
                  <td className={"border p-1"}>{index + 1}</td>
                  <td className={"border p-1"}>{item.id}</td>
                  <td className={"border p-1"}>{item.name}</td>
                  <td className={"border p-1"}>{item.address}</td>
                  <td className={"border p-1"}>{item.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default List;
