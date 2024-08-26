import React from "react";
import Input from "./Input";

const GenderCheckBox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex space-x-4">
      <div className="text-white space-x-3 flex items-center mb-3">
        <input
          id="male"
          name="gender"
          type="checkbox"
          onChange={()=>onCheckboxChange("male")}
          checked={selectedGender == "male"}
          class="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
        />
        <label htmlFor="male">male</label>
      </div>
      <div className="text-white space-x-3 flex items-center mb-3">
        <input
          id="female"
          name="gender"
          type="checkbox"
          value=""
          onChange={()=>onCheckboxChange("female")}
          checked={selectedGender == "female"}
          class="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
        />
        <label htmlFor="female">female</label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
