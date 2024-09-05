import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import "./App.css";
import UserForm from "./components/UserForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={UserList} />
        <Route path="/users/:id" Component={UserForm}/>
        <Route path="/adduser" Component={UserForm} />
      </Routes>
    </Router>
  );
}

export default App;
