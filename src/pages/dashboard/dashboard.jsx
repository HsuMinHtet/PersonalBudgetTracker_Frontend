import React, { useState } from "react";
import {
  Button,
  Table,
  InputText,
  CardSelect,
  Modal,
} from "../../components/common";
import dashboardImg from "../../assets/img/dashboard-img.svg";
import { Edit, Trash } from "iconsax-react";

function dashboard() {
  const columns = ["No", "Categories", "Type"];
  const data = [
    { No: "1", Categories: "Salary", Type: "Income" },
    { No: "2", Categories: "Groceries", Type: "Expense" },
    { No: "3", Categories: "Clothing", Type: "Expense" },
  ];

  const handleEdit = (row) => {
    console.log("Edit clicked for:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete clicked for:", row);
  };

  const actions = [
    { icon: <Edit />, type: "edit", onClick: handleEdit },
    { icon: <Trash />, type: "delete", onClick: handleDelete },
  ];

  //Add Transaction=> Type: Income | Expense
  const handleSelection = (value) => {
    console.log("Handle Selected:", value);
  };

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Add Transaction button click
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTransaction = () => {
    console.log("Transaction Data: ");
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center flex-row max-w-screen-lg p-4">
        <div>
          <h1 className="font-black text-2xl">Track Your Finances with Ease</h1>
          <p className="py-4 mb-4">
            Welcome to your Budget Tracker Dashboard! Here, you can seamlessly
            manage your financial transitions. View all your income and expenses
            at a glance with the detailed data table. Use the ‘Add Transition’
            button to quickly record your financial activities—whether you're
            adding an income source or tracking an expense. The interactive
            modal makes it simple to categorize and document every transition.
            Take control of your finances today!
          </p>
        </div>
        <img src={dashboardImg} alt="Categories" className="h-60 w-60 p-6" />
      </div>

      <div className="flex items-center justify-between flex-row max-w-screen-lg px-4">
        <h1 className="font-medium text-xl">Transitions</h1>
        <Button
          text="Add Transition"
          onClick={openModal}
          variant="primary"
          tailwindClass="w-full"
        />
      </div>

      <div className="flex items-center justify-center flex-row max-w-screen-lg px-4">
        <Table
          columns={columns}
          data={data}
          actions={actions}
          tailwindClass="bg-cardBg dark:bg-darkCardBg"
          variant="primary"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        tailwindClass="bg-cardBg dark:bg-darkCardBg p-16"
      >
        <h1 className="font-black text-2xl mb-12">Add Transition</h1>

        <p className="text-textColor dark:text-darkTextColor">
          Select Transition Type
        </p>
        <CardSelect name="Select Transition Type" onChange={handleSelection} />

        <InputText
          type="number"
          labelFor="amount"
          labelName="Transition Amount"
          inputId="amount"
          name="Transition Amount"
          placeholder="Enter amount"
        />
        <InputText
          type="text"
          labelFor="description"
          labelName="Description"
          inputId="description"
          name="Description"
          placeholder="Enter Description"
        />
        <Button
          text="Add "
          onClick={addTransaction}
          variant="primary"
          tailwindClass="w-full mt-12"
        />
      </Modal>
    </div>
  );
}

export default dashboard;
