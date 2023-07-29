import React from "react";

const Button = ({ children, type = "", className, onClick = () => {} }) => {
  return (
    <button
      className={
        className ??
        "px-10 py-2 bg-main text-white rounded-md hover:bg-secondary hover:drop-shadow-md duration-200 ease-in"
      }
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Toggle = ({ active, setActive }) => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={active}
            readOnly
          />
          <div
            onClick={setActive}
            className="w-6 h-11 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  after:translate-y-full peer-checked:after:translate-y-0 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          />
          <span className="ml-2 text-sm font-medium text-gray-900 w-7">
            {active ? "ON" : "OFF"}
          </span>
        </label>
      </div>
    </div>
  );
};

export { Button, Toggle };
