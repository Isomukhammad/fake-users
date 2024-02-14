import { CSVLink } from "react-csv";

import { ChangeEvent, Dispatch, JSX, useState } from "react";

import { FAKER_ACTIONS, IFakerActions, IFakerState } from "../reducer.ts";
import RandomIcon from "./RandomIcon.tsx";

interface HeaderProps {
  state: IFakerState;
  dispatch: Dispatch<IFakerActions>;
}

const Header = ({ state, dispatch }: HeaderProps): JSX.Element => {
  const [errors, setErrors] = useState<number>(0);

  const setSeed = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: FAKER_ACTIONS.SET_SEED, payload: +value });
  };

  const setRandomSeed = (): void =>
    dispatch({
      type: FAKER_ACTIONS.SET_SEED,
      payload: Math.floor(Math.random() * 1000000 + 1),
    });

  const setRegion = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>): void =>
    dispatch({ type: FAKER_ACTIONS.SET_REGION, payload: value });

  const serErrorRange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    let newValue: number = +value;
    if (value.startsWith("0") && value !== "0") {
      newValue = +value.slice(1);
    }
    +value >= 0 && +value <= 1000 && setErrors(newValue);
  };

  return (
    <header className={"rounded-b-md bg-white py-4 shadow-md"}>
      <div
        className={"container mx-auto flex items-center justify-between px-5"}
      >
        <div className={"flex items-center gap-2"}>
          <span className={"font-medium"}>Region:</span>
          <select
            name={"region"}
            id={"region"}
            value={state.region}
            onChange={setRegion}
            className={
              "cursor-pointer rounded-md border-2 border-neutral-300 px-1 py-1.5"
            }
          >
            <option value={"ru"}>Russia</option>
            <option value={"en_US"}>USA</option>
            <option value={"es"}>Spain</option>
          </select>
        </div>
        <div className={"flex items-center gap-2"}>
          <span className={"font-medium"}>Errors:</span>
          <input
            type="range"
            min={0}
            max={10}
            value={errors}
            onChange={serErrorRange}
            className={"w-24"}
          />
          <input
            type="number"
            min={0}
            max={1000}
            value={errors}
            onChange={serErrorRange}
            className={"rounded-md border-2 border-neutral-300 px-1 py-1.5"}
          />
        </div>
        <div className={"flex items-center gap-2"}>
          <span className={"font-medium"}>Seed:</span>
          <input
            type="number"
            min={0}
            value={state.seed}
            onChange={setSeed}
            className={
              "w-24 rounded-md border-2 border-neutral-300 px-1 py-1.5"
            }
          />
          <button
            type={"button"}
            title={"Randomize seed"}
            onClick={setRandomSeed}
            className={
              "rounded-md bg-blue-500 p-[10px] transition-colors duration-200 ease-in-out hover:bg-blue-600 active:bg-blue-700"
            }
          >
            <RandomIcon className={"h-5 w-5 fill-white"} />
          </button>
        </div>
        <CSVLink
          data={state.list}
          filename={"fake-users.csv"}
          className={
            "rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-200 ease-in-out hover:bg-blue-600 active:bg-blue-700"
          }
        >
          Export to CSV
        </CSVLink>
      </div>
    </header>
  );
};

export default Header;
