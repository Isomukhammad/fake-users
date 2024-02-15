import { forwardRef } from "react";

import { IFakerState } from "../reducer.ts";

interface TableProps {
  state: IFakerState;
}

const Table = forwardRef<HTMLTableRowElement, TableProps>(({ state }, ref) => {
  return (
    <table className={"w-full table-auto rounded-md border bg-white"}>
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
                ref={ref}
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
  );
});

export default Table;
