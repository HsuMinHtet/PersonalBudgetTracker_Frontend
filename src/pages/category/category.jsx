import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import InputText from '../../components/common/InputText';
import CardSelect from '../../components/common/Select';
import Modal from '../../components/common/Modal';
import categoryImg from '../../assets/img/category-img.svg';
import { Edit, Trash } from 'iconsax-react';

function category() {

    const columns = ['No', 'Categories', 'Type'];
    const data = [
        { No: '1', Categories: 'Salary', Type: 'Income' },
        { No: '2', Categories: 'Groceries', Type: 'Expense' },
        { No: '3', Categories: 'Clothing', Type: 'Expense' },
    ];

    const handleEdit = (row) => {
        console.log('Edit clicked for:', row);
    };

    const handleDelete = (row) => {
        console.log('Delete clicked for:', row);
    };

    const actions = [
        { icon: <Edit />, type: 'edit', onClick: handleEdit },
        { icon: <Trash />, type: 'delete',  onClick: handleDelete },
    ];

    //Select Option
    const handleSelection = (value) => {
        console.log('Selected:', value);
    };

    //Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-center flex-row max-w-screen-lg p-4'>
                <div>
                    <h1 className='font-black text-2xl'>Customize Your Categories</h1>
                    <p className='py-4 mb-4'>This is your hub for managing transition categories! Easily add new categories with the Add Category button to tailor your budget tracker to your unique needs. Group your income and expenses into meaningful categories, making it simple to review and analyze your financial habits. Stay in control of your budget by keeping your categories organized and up-to-date!</p>
                </div>
                <img src={categoryImg} alt="Categories" className="h-60 w-60 p-6" />
            </div>

            <div className='flex items-center justify-between flex-row max-w-screen-lg pl-4 pr-0'>
                <h1 className='font-medium text-xl'>Categories</h1>
                <Button text='Add Category' onClick={openModal}  variant="primary" tailwindClass="w-full" />
            </div>

            <div className='flex items-center justify-center flex-row max-w-screen-lg px-4'>
                <Table columns={columns} data={data} actions={actions} tailwindClass="bg-cardBg dark:bg-darkCardBg" variant="primary" />
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} tailwindClass="bg-cardBg dark:bg-darkCardBg p-16">
                <h1 className='font-black text-2xl mb-12'>Add Transition</h1>

                <p className="text-textColor dark:text-darkTextColor">Select Transition Type</p>
                <CardSelect name="Select Transition Type" onChange={handleSelection} />

                <InputText type='number' labelFor='amount' labelName='Transition Amount' inputId='amount' name='Transition Amount' placeholder="Enter amount" />

                <Button text='Add ' variant="primary" tailwindClass="w-full mt-12" />
            </Modal>

        </div>
    )
}

export default category;
