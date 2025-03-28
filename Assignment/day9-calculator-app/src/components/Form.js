import React from "react";
import { useState } from "react";

const Form = ({ expenseListData, setExpenseListData, value, setValue, isEditMode, setIsEditMode, showAlert}) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedData;
    if (isEditMode) {
      updatedData = expenseListData.map((item) =>
        item.id === value.id
          ? { ...item, title: value.title, cost: value.cost }
          : item
      );
      showAlert("항목이 수정되었습니다!");
    } else {
      const newExpenseData = {
        id: Date.now(),
        title: value.title,
        cost: value.cost,
      };
      updatedData = [...expenseListData, newExpenseData];
      showAlert("새 항목이 추가되었습니다!");
    }

    // 상태 업데이트 후 localStorage에 저장
    setExpenseListData(updatedData);
    localStorage.setItem("expenseData", JSON.stringify(updatedData));

    // 입력 필드 초기화
    setValue({ title: "", cost: 0 });
    setIsEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <div className="input-row">
          <div className="input-content">
            <h3 className="input-title">지출 항목</h3>
            <input
              type="text"
              value={value.title}
              placeholder="예) 렌트비"
              onChange={(e) => setValue({...value, title: e.target.value})}
            />
          </div>
          <div className="input-content">
            <h3 className="input-title">비용</h3>
            <input
              type="number"
              value={value.cost}
              placeholder={0}
              onChange={(e) => setValue({...value, cost: e.target.value})}
            />
          </div>
        </div>
        <button type="submit" disabled={!value.title}>
          {isEditMode ? "수정" : "저장"}
        </button>
      </div>
    </form>
  );
};

export default Form;
