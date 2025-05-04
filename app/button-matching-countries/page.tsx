"use client";

import { useState } from "react";

const data: Record<string, string> = {
  "United States": "Washington, D.C.",
  Canada: "Ottawa",
  Mexico: "Mexico City",
  "United Kingdom": "London",
  France: "Paris",
  Germany: "Berlin",
  Italy: "Rome",
  Spain: "Madrid",
  Japan: "Tokyo",
  China: "Beijing",
  India: "New Delhi",
  Brazil: "Brasília",
  Argentina: "Buenos Aires",
  Australia: "Canberra",
};

type TOption = {
  name: string;
  state: "DEFAULT" | "SELECTED" | "DONOTMATCH";
};

function page() {
  const countries = Object.keys(data);
  const capitals = Object.values(data);
  const [selected, setSelected] = useState<TOption | undefined>();
  const [options, setOptions] = useState<TOption[]>(() =>
    [...countries, ...capitals]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({
        name: item,
        state: "DEFAULT",
      }))
  );

  const handleMatchingLogic = (option: TOption) => {
    // If the option is already selected or matched, do nothing
    if (option.state !== "DEFAULT") {
      return;
    }

    // IF not selected then select and update options list state
    if (!selected) {
      setSelected({ ...option });
      setOptions(
        options.map((opt) => {
          return opt.name === option.name
            ? {
                ...opt,
                state: "SELECTED",
              }
            : opt;
        })
      );
      return;
    }

    // IF selected option check for matching
    const isMatch =
      selected.name === data[option.name] ||
      data[selected.name] === option.name;

    if (isMatch) {
      // First update all options states
      const updatedOptions: TOption[] = options.map((opt) => {
        if (opt.name === option.name || opt.name === selected.name) {
          return {
            ...opt,
            state: "SELECTED",
          };
        }
        return opt;
      });

      // Then after a short delay, remove the matched pair
      setOptions(updatedOptions);

      setTimeout(() => {
        setOptions(
          updatedOptions.filter((opt) => {
            return opt.name !== option.name && opt.name !== selected.name;
          })
        );
        setSelected(undefined);
      }, 1000);
    } else {
      // If no match, show both as not matching temporarily
      setOptions(
        options.map((opt) => {
          if (opt.name === option.name || opt.name === selected.name) {
            return {
              ...opt,
              state: "DONOTMATCH",
            };
          }
          return opt;
        })
      );

      // Reset after a short delay
      setTimeout(() => {
        setOptions(
          options.map((opt) => {
            if (opt.name === option.name || opt.name === selected.name) {
              return {
                ...opt,
                state: "DEFAULT",
              };
            }
            return opt;
          })
        );
        setSelected(undefined);
      }, 1000);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center w-full h-full bg-white">
      <h1>Button Matching Countries</h1>
      <p>Click on the button that matches the country with its capital.</p>
      <div className="grid grid-cols-5 w-fit gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded w-40 ${
              option.state === "SELECTED"
                ? " bg-green-500"
                : option.state === "DONOTMATCH"
                ? "bg-red-500"
                : ""
            }`}
            onClick={() => handleMatchingLogic(option)}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default page;
