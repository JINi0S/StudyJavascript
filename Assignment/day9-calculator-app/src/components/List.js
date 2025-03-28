import React from "react";
import ListItem from "./ListItem";
import { FaTrashAlt } from 'react-icons/fa'; // 삭제 아이콘 가져오기

const List = ({
  handleEdit,
  expenseListData,
  setExpenseListData,
  showAlert
}) => {

  const handleDeleteAll = (id) => {
    setExpenseListData([]);
    localStorage.setItem("expenseData", JSON.stringify([]));
    showAlert("모든 항목이 삭제되었습니다!");
  };

  return (
    <div className="expense-list">
      {expenseListData.map((data) => (
        <ListItem
          key={data.id}
          data={data}
          handleEdit={handleEdit}
          setExpenseListData={setExpenseListData}
          showAlert={showAlert}
        />
      ))}
      {expenseListData.length > 0 && (
        <button className="delete-all" onClick={handleDeleteAll}>
          목록 지우기<FaTrashAlt />
          </button>
      )}
    </div>
  );
};

export default List;
