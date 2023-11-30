import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from 'react-icons/fa';

const GroupEntry = () => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedSubgroup, setSelectedSubgroup] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedAdditionalOption, setSelectedAdditionalOption] = useState('');
  const [groupList, setGroupList] = useState(['Asset', 'Equity', 'Expenditure', 'Income', 'Liability']);
  const [subgroupList, setSubgroupList] = useState(['Fixed Asset', 'Current Asset', 'Intangible Asset']);
  const [optionList, setOptionList] = useState(['Building', 'Machinery', 'Equipment']);
  const [additionalOptionList, setAdditionalOptionList] = useState([]);

  // const subgroups = {
  //   Asset: {
  //     'Fixed Asset': ['Building', 'Machinery', 'Equipment'],
  //     'Current Asset': ['Building', 'Machinery', 'Equipment'],
  //     'Intangible Asset': ['Building', 'Machinery', 'Equipment'],
  //   },
  //   Equity: {
  //     'Fixed Asset': ['Building', 'Machinery', 'Equipment'],
  //     'Current Asset': ['Building', 'Machinery', 'Equipment'],
  //     'Intangible Asset': ['Building', 'Machinery', 'Equipment'],
  //   },
  //   Expenditure: {
  //     'Fixed Asset': ['Building', 'Machinery', 'Equipment'],
  //     'Current Asset': ['Building', 'Machinery', 'Equipment'],
  //     'Intangible Asset': ['Building', 'Machinery', 'Equipment'],
  //   },
  //   Income: {
  //     'Fixed Asset': ['Building', 'Machinery', 'Equipment'],
  //     'Current Asset': ['Building', 'Machinery', 'Equipment'],
  //     'Intangible Asset': ['Building', 'Machinery', 'Equipment'],
  //   },
  //   Liability: {
  //     'Fixed Asset': ['Building', 'Machinery', 'Equipment'],
  //     'Current Asset': ['Building', 'Machinery', 'Equipment'],
  //     'Intangible Asset': ['Building', 'Machinery', 'Equipment'],
  //   },
  // };

  useEffect(() => {
    // Load data from localStorage on component mount
    const storedGroupList = JSON.parse(localStorage.getItem('groupList')) || ['Asset', 'Equity', 'Expenditure', 'Income', 'Liability'];
    const storedSubgroupList = JSON.parse(localStorage.getItem('subgroupList')) || ['Fixed Asset', 'Current Asset', 'Intangible Asset'];
    const storedOptionList = JSON.parse(localStorage.getItem('optionList')) || ['Building', 'Machinery', 'Equipment'];
    const storedAdditionalOptionList = JSON.parse(localStorage.getItem('additionalOptionList')) || [];

    setGroupList(storedGroupList);
    setSubgroupList(storedSubgroupList);
    setOptionList(storedOptionList);
    setAdditionalOptionList(storedAdditionalOptionList);

    // You can add more code here to set other state values based on you
  }, []);


  const saveToLocalStorage = () => {
    // Save data to localStorage
    console.log("Saving to local storage...");

    console.log("subgroupList:", subgroupList);
    console.log("optionList:", optionList);
    console.log("additionalOptionList:", additionalOptionList);

    window.localStorage.setItem('subgroupList', JSON.stringify(subgroupList));
    window.localStorage.setItem('optionList', JSON.stringify(optionList));
    window.localStorage.setItem('additionalOptionList', JSON.stringify(additionalOptionList));

    setSelectedGroup("");
    setSelectedSubgroup("");
    setSelectedOption("");
    setSelectedAdditionalOption("");

    Swal.fire({
      title: 'Option saved Successfully!',
      
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };


  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
    setSelectedSubgroup('');
    setSelectedOption('');
    setSelectedAdditionalOption('');
  };

  const handleSubgroupChange = (e) => {
    setSelectedSubgroup(e.target.value);
    setSelectedOption('');
    setSelectedAdditionalOption('');
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setSelectedAdditionalOption('');
  };

  const handleAddOption = async (index) => {
    const fieldName =
      index === 0
        ? 'Select Subgroup'
        : index === 1
          ? 'Select Option'
          : index === 2
            ? 'Select Additional Option'
            : 'Select Additional Option';

    const newOption = await Swal.fire({
      title: `Enter a new option for ${fieldName}:`,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage('Please enter a valid option');
        }
        return value;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (newOption.isConfirmed) {
      const existingOptions =
        index === 0
          ? subgroupList
          : index === 1
            ? optionList
            : index === 2
              ? additionalOptionList
              : additionalOptionList;

      const updatedOptions = [...existingOptions, newOption.value];

      switch (index) {
        case 0:
          setSubgroupList(updatedOptions);
          break;
        case 1:
          setOptionList(updatedOptions);
          break;
        case 2:
          setAdditionalOptionList(updatedOptions);
          break;
        case 3:
          setAdditionalOptionList(updatedOptions);
          break;
        default:
          break;
      }


      saveToLocalStorage();


      toast.success(`Option "${newOption.value}" added successfully!`);
    }
  };




  const handleClearForm = () => {
    setSelectedGroup('');
    setSelectedSubgroup('');
    setSelectedOption('');
    setSelectedAdditionalOption('');
    setGroupList([]);
    setSubgroupList([]);
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
          {groupList.map((group) => (
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

              {subgroupList.map((subgroup) => (
                <option key={subgroup} value={subgroup}>
                  {subgroup}
                </option>
              ))}
            </select>
            {selectedGroup && (
              <button onClick={() => handleAddOption(0)} className="ml-2 cursor-pointer px-4 py-2 text-black bg-white border rounded-md">
                <FaPlus></FaPlus>
              </button>
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
              {
                optionList.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
            <button onClick={() => handleAddOption(1)} className="ml-2 cursor-pointer px-4 py-2 text-black bg-white border rounded-md">
              <FaPlus></FaPlus>
            </button>
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
              onChange={(e) => setSelectedAdditionalOption(e.target.value)}
            >
              <option value="">Select an additional option</option>
              {additionalOptionList.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button onClick={() => handleAddOption(2)} className="ml-2 cursor-pointer px-4 py-2 text-black bg-white border rounded-md">
              <FaPlus></FaPlus>
            </button>
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









