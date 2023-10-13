import logo from "./logo.svg";
import "./App.css";
import Form from "./components/form";
import { Route, Routes } from "react-router-dom";
import UsersList from "./components/usersList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/users-list" element={<UsersList />} />
      </Routes>
    </div>
  );
}

export default App;
