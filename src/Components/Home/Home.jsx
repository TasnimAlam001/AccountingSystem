import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaList, FaPlus } from 'react-icons/fa';

const Home = () => {
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedSubgroup, setSelectedSubgroup] = useState('');
    const [selectedSubgroup2, setSelectedSubgroup2] = useState('');
    const [selectedSubgroup3, setSelectedSubgroup3] = useState('');
    const [groupList, setGroupList] = useState(['Asset', 'Equity', 'Expenditure', 'Income', 'Liability']);
    const [subgroupList, setSubgroupList] = useState(['Fixed Asset', 'Current Asset', 'Intangible Asset']);
    const [subgroupList2, setSubgroupList2] = useState(['Building', 'Machinery', 'Equipment']);
    const [subgroup3List, setSubgroup3List] = useState([]);



    useEffect(() => {
        // Load data from localStorage on component mount
        const storedGroupList = JSON.parse(localStorage.getItem('groupList')) || ['Asset', 'Equity', 'Expenditure', 'Income', 'Liability'];
        const storedSubgroupList = JSON.parse(localStorage.getItem('subgroupList')) || ['Fixed Asset', 'Current Asset', 'Intangible Asset'];
        const storedSubgroupList2 = JSON.parse(localStorage.getItem('subgroupList2')) || ['Building', 'Machinery', 'Equipment'];
        const storedSubgroup3List = JSON.parse(localStorage.getItem('Subgroup3List')) || [];

        setGroupList(storedGroupList);
        setSubgroupList(storedSubgroupList);
        setSubgroupList2(storedSubgroupList2);
        setSubgroup3List(storedSubgroup3List);


    }, []);


    //Save data to Local Storage
    const saveToLocalStorage = () => {

        window.localStorage.setItem('subgroupList', JSON.stringify(subgroupList));
        window.localStorage.setItem('subgroupList2', JSON.stringify(subgroupList2));
        window.localStorage.setItem('Subgroup3List', JSON.stringify(subgroup3List));

        setSelectedGroup("");
        setSelectedSubgroup("");
        setSelectedSubgroup2("");
        setSelectedSubgroup3("");

        Swal.fire({
            title: 'Option saved Successfully!',

            icon: 'success',
            confirmButtonText: 'OK',
        });
    };


    const handleGroupChange = (e) => {
        setSelectedGroup(e.target.value);
        setSelectedSubgroup('');
        setSelectedSubgroup2('');
        setSelectedSubgroup3('');
    };

    const handleSubgroupChange = (e) => {
        setSelectedSubgroup(e.target.value);
        setSelectedSubgroup2('');
        setSelectedSubgroup3('');
    };

    const handleSubgroup2Change = (e) => {
        setSelectedSubgroup2(e.target.value);
        setSelectedSubgroup3('');
    };

    const handleAddOption = async (index) => {

        const newOption = await Swal.fire({
            title: `Enter a Option You want to Add`,
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
                        ? subgroupList2
                        : index === 2
                            ? subgroup3List
                            : subgroup3List;

            const updatedOptions = [...existingOptions, newOption.value];

            switch (index) {
                case 0:
                    setSubgroupList(updatedOptions);
                    break;
                case 1:
                    setSubgroupList2(updatedOptions);
                    break;
                case 2:
                    setSubgroup3List(updatedOptions);
                    break;
                case 3:
                    setSubgroup3List(updatedOptions);
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
        setSelectedSubgroup2('');
        setSelectedSubgroup3('');

    };

    return (
        <div className="m-4  bg-slate-100 p-4 rounded-xl py-5">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name of Group:</label>
                <div className='flex items-center gap-2'>

                    <span className=' px-3 py-2.5 text-black bg-white border rounded-md'><FaList /></span>
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


            </div>

            {selectedGroup && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Sub group:</label>
                    <div className="flex items-center gap-2">
                        <span className=' px-3 py-2.5 text-black bg-white border rounded-md'><FaList /></span>
                        <select
                            className="mt-1 p-2 border rounded-md w-full"
                            value={selectedSubgroup}
                            onChange={handleSubgroupChange}
                        >
                            <option disabled value="">Select group</option>

                            {subgroupList.map((subgroup) => (
                                <option key={subgroup} value={subgroup}>
                                    {subgroup}
                                </option>
                            ))}
                        </select>
                        {selectedGroup && (
                            <button onClick={() => handleAddOption(0)} className="cursor-pointer px-4 py-2 text-black bg-white border rounded-md">
                                <FaPlus></FaPlus>
                            </button>
                        )}
                    </div>
                </div>
            )}

            {selectedSubgroup && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Sub Group:</label>
                    <div className="flex items-center gap-2">
                        <span className=' px-3 py-2.5 text-black bg-white border rounded-md'><FaList /></span>
                        <select
                            className="mt-1 p-2 border rounded-md w-full"
                            value={selectedSubgroup2}
                            onChange={handleSubgroup2Change}
                        >
                            <option disabled value="">Select Sub Group</option>
                            {
                                subgroupList2.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                        </select>
                        <button onClick={() => handleAddOption(1)} className=" cursor-pointer px-4 py-2 text-black bg-white border rounded-md">
                            <FaPlus></FaPlus>
                        </button>
                    </div>
                </div>
            )}

            {selectedSubgroup2 && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Sub Group:
                    </label>
                    <div className="flex items-center gap-2">
                        <span className=' px-3 py-2.5 text-black bg-white border rounded-md'><FaList /></span>
                        <select
                            className="mt-1 p-2 border rounded-md w-full"
                            value={selectedSubgroup3}
                            onChange={(e) => setSelectedSubgroup3(e.target.value)}
                        >
                            <option disabled value="">Select sub group</option>
                            {subgroup3List.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => handleAddOption(2)} className="cursor-pointer px-4 py-2 text-black bg-white border rounded-md">
                            <FaPlus></FaPlus>
                        </button>
                    </div>
                </div>
            )}


            <div className='flex justify-end'>


                <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-md ml-auto "
                    onClick={handleClearForm}
                >
                    Clear Form
                </button>
            </div>
        </div>
    );
};

export default Home;









