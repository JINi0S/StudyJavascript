import React from "react";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // 수정, 삭제 아이콘 가져오기

const ListItem = ({ data, handleEdit, setExpenseListData, showAlert }) => {
  const handleDelete = (id) => {
    setExpenseListData((prevData) => {
      const updatedData = prevData.filter((item) => item.id !== id);
      localStorage.setItem("expenseData", JSON.stringify(updatedData));
      return updatedData;
    });

    showAlert("항목이 삭제되었습니다!");
  };

  return (
    <div className="expense-list-item">
      <div className="expense-title">{data.title}</div>
      <div className="expense-cost">{data.cost}</div>

      <div className="expense-actions">
        <button id="edit" onClick={() => handleEdit(data)}>
          <FaEdit />
        </button>
        <button id="delete" onClick={() => handleDelete(data.id)}>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default ListItem;
