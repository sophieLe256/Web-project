import "./App.css";
import { Button } from "react-bootstrap";
import { BiAtom } from "react-icons/bi";
import Navbar from "./component/Navbar";
import { Login } from "./Login";
import { Register } from "./Register";
import { useState } from "react";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login /> : Register
      /* <Button variant="outline-success">Close me</Button>
      <BiAtom /> */
}
      {/* <>
        <Navbar/>
      </> */}
    </div>
  );
}

export default App;
