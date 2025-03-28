import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import Alert from "./components/Alert";
import { useState } from "react";

// const initialExpenseData = { id: 0, title: "식비", cost: 0 };
const initialExpenseData = localStorage.getItem("expenseData")
  ? JSON.parse(localStorage.getItem("expenseData"))
  : [];

function App() {
  const [expenseListData, setExpenseListData] = useState(initialExpenseData);
  const [value, setValue] = useState({ id: Date.now(), title: "", cost: 0 });
  const [alertMessage, setAlertMessage] = useState(""); // 알림 메시지 상태 추가
  const [alertVisible, setAlertVisible] = useState(false); // 알림 visible 상태 추가
  const [isEditMode, setIsEditMode] = useState(false); // 수정 상태 관리

  const totalCost = expenseListData.reduce(
    (sum, item) => sum + Number(item.cost),
    0
  );

  const handleEdit = (expenseData) => {
    setIsEditMode(true); // 수정 모드로 전환
    setValue({
      id: expenseData.id,
      title: expenseData.title,
      cost: expenseData.cost,
    });
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000); // 3초 후 알림 숨김
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="content">
        <h1>예산 계산기</h1>
        <Form
          expenseListData={expenseListData}
          setExpenseListData={setExpenseListData}
          value={value}
          setValue={setValue}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          showAlert={showAlert}
        />
        <List
          expenseListData={expenseListData}
          handleEdit={handleEdit}
          setExpenseListData={setExpenseListData}
          showAlert={showAlert}
        />
        <h3
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >{`총 지출: ${totalCost}`}</h3>
      </div>
      {/* 알림 메시지 */}
      <Alert isVisible={alertVisible} message={alertMessage} />
    </div>
  );
}

export default App;
