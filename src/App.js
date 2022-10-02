import "./App.css";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import { Routes, Route } from "react-router-dom";
import { Signup } from "./components/registration/Signup";
import { Signin } from "./components/registration/Signin";
import { AddTask } from "./components/update/AddTask";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
       <Route path='/home' element={
         <Main />
         }/>
       <Route path="/signup" 
       element={<Signup />} 
       />
       <Route path='/signin' 
       element={<Signin />} 
       />
       <Route path='/tasks' 
       element={<AddTask />} 
       />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
