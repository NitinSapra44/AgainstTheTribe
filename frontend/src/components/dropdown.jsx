// src/components/Dropdown.jsx
import { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select an option");

  const options = ["Option 1", "Option 2", "Option 3"];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-64">
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
      >
        {selected}
        <span className="float-right">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
