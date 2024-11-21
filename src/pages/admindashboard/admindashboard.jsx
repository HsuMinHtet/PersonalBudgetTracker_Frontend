import React, { useState } from "react";
import Button from "../../components/common/Button";
import Table from "../../components/common/Table";
import InputText from "../../components/common/InputText";
import dashboardImg from "../../assets/img/dashboard-img.svg";
import CardSelect from "../../components/common/Select";
import Modal from "../../components/common/Modal";
import { Edit, Trash } from "iconsax-react";

function admindashboard() {
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

  //Select Option
  const handleSelection = (value) => {
    console.log("Selected:", value);
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
    <div className="flex flex-col">
      <div className="flex items-center justify-center flex-row max-w-screen-lg p-4">
        <div>
          <h1 className="font-black text-2xl">Track Your Finances with Ease</h1>
          <p className="py-4 mb-4">
            Welcome Budget Tracker ADMIN! Here, you can seamlessly review the
            list of ACCOUNT_HOLDER and you can delete the AccountHolder, who are
            not active over a year or there have no any transactions. Take
            control of your user list!
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

        <Button text="Add " variant="primary" tailwindClass="w-full mt-12" />
      </Modal>
    </div>
  );
}

export default admindashboard;
