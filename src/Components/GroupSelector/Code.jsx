import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const GroupEntry = () => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedSubgroup, setSelectedSubgroup] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedAdditionalOption, setSelectedAdditionalOption] = useState('');
  const [customOptions, setCustomOptions] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [additionalOptionList, setAdditionalOptionList] = useState([]);
  const groups = ['Asset', 'Equity', 'Expenditure', 'Income', 'Liability'];
  const subgroups = {
    Asset: ['Fixed Asset', 'Current Asset'],
    // Add subgroups for other groups as needed
  };

  const handleGroupChange = (e) => {
    const selectedGroup = e.target.value;
    setSelectedGroup(selectedGroup);
    setSelectedSubgroup('');
    setSelectedOption('');
    setSelectedAdditionalOption('');
  };

  const handleSubgroupChange = (e) => {
    const selectedSubgroup = e.target.value;
    setSelectedSubgroup(selectedSubgroup);
    setSelectedOption('');
    setSelectedAdditionalOption('');
  };

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedOption(selectedOption);
    setSelectedAdditionalOption('');
  };

  const handleAdditionalOptionChange = (e) => {
    const selectedAdditionalOption = e.target.value;
    setSelectedAdditionalOption(selectedAdditionalOption);
  };

  const handleAddOption = (index) => {
    const newOption = prompt('Enter a new option:');
    if (newOption) {
      setCustomOptions([...customOptions, newOption]);

      if (index === 0) {
        // For "Select Option"
        setOptionList([...optionList, newOption]);
      } else {
        // For "Select Additional Option"
        setAdditionalOptionList([...additionalOptionList, newOption]);
      }
    }
  };

  const handleClearForm = () => {
    setSelectedGroup('');
    setSelectedSubgroup('');
    setSelectedOption('');
    setSelectedAdditionalOption('');
    setCustomOptions([]);
    setOptionList([]);
    setAdditionalOptionList([]);
  };

  return (
    <div className="m-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Group:</label>
        <select
          className="mt-1 p-2 border rounded-md w-full"
          value={selectedGroup}
          onChange={handleGroupChange}
        >
          <option value="">Select a group</option>
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      {selectedGroup && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Subgroup:</label>
          <div className="flex items-center">
            <select
              className="mt-1 p-2 border rounded-md w-full"
              value={selectedSubgroup}
              onChange={handleSubgroupChange}
            >
              <option value="">Select a subgroup</option>
              {subgroups[selectedGroup].map((subgroup) => (
                <option key={subgroup} value={subgroup}>
                  {subgroup}
                </option>
              ))}
            </select>
            {selectedSubgroup && (
              <div className="ml-2 cursor-pointer px-4 py-2 text-black bg-white border rounded-md">

                <FaPlus  onClick={() => handleAddOption(1)} />
              </div>
            )}
          </div>
        </div>
      )}

      {selectedSubgroup && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Option:</label>
          <div className="flex items-center">
            <select
              className="mt-1 p-2 border rounded-md w-full"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="">Select an option</option>
              {optionList.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="ml-2 flex-shrink-0">
              <button
                className="ml-2 cursor-pointer px-4 py-2 text-black bg-white border rounded-md"
                onClick={() => handleAddOption(0)} // Pass index 0 for "Select Option"
              >
                <FaPlus></FaPlus>
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedOption && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Additional Option:
          </label>
          <div className="flex items-center">
            <select
              className="mt-1 p-2 border rounded-md w-full"
              value={selectedAdditionalOption}
              onChange={handleAdditionalOptionChange}
            >
              <option value="">Select an additional option</option>
              {additionalOptionList.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="ml-2 flex-shrink-0">
              <button
                className="ml-2 cursor-pointer px-4 py-2 text-black bg-white border rounded-md"
                onClick={() => handleAddOption(1)} // Pass index 1 for "Select Additional Option"
              >
                <FaPlus></FaPlus>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md"
        onClick={handleClearForm}
      >
        Clear Form
      </button>
    </div>
  );
};

export default GroupEntry;
