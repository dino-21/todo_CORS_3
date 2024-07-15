import "./App.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import { Container, List, Paper } from "@mui/material";
import AddTodo from "./AddTodo";
import { call } from "./ApiService.js";


function App() {
  const [items, setItems] = useState([]); // Todo 항목들을 저장할 상태 변수

  useEffect(() => {
     // 페이지가 로드될 때 Todo 리스트를 가져오는 API 호출
    call("/todo", "GET", null)
    .then((response) => setItems(response.data)); // 가져온 데이터로 상태 업데이트
  }, []); // 빈 배열을 전달하여 페이지 로드 시 한 번만 실행


   // Todo 항목을 추가하는 API 호출
  const addItem = (item) => {
    call("/todo", "POST", item)
    .then((response) => setItems(response.data)); // 업데이트된 Todo 리스트로 상태 업데이트
  };

  // Todo 항목을 수정하는 API 호출
  const editItem = (item) => {
    call("/todo", "PUT", item)
    .then((response) => setItems(response.data)); // 업데이트된 Todo 리스트로 상태 업데이트
  };

// Todo 항목을 삭제하는 API 호출
  const deleteItem = (item) => {
    call("/todo", "DELETE", item)
    .then((response) => setItems(response.data)); // 업데이트된 Todo 리스트로 상태 업데이트
  };


  let todoItems = items.length > 0 && (
    // Todo 항목들을 보여주는 컴포넌트
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo item={item} key={item.id} editItem={editItem} deleteItem={deleteItem} />
        ))}
      </List>
    </Paper>
  );
  return (<div className="App">
        <Container maxWidth="md">
          <AddTodo addItem={addItem} />  {/* Todo 항목을 추가하는 컴포넌트 */}
          <div className="TodoList">{todoItems}</div> {/* Todo 리스트를 보여주는 컴포넌트 */}
        </Container>
  </div>);
}

export default App