import "./App.css";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import { Routes, Route } from "react-router-dom";
import { Signup } from "./components/registration/Signup";
import { Signin } from "./components/registration/Signin";
import { AddTask } from "./components/update/AddTask";
import LoginContextProvider from "./context/LoginContext";
import { TaskContextProvider } from "./context/TasksContext";

function App() {
  return (
    <div className="App">
      <Header data-testid='header' />
      <Routes>
        <Route path="/" element={<Main />} />

        <Route
          path="/signup"
          element={
            <LoginContextProvider>
              <Signup />
            </LoginContextProvider>
          }
        />
        <Route
          path="/signin"
          element={
            <LoginContextProvider>
              <Signin />
            </LoginContextProvider>
          }
        />
        <Route
          path="/tasks"
          element={
            <TaskContextProvider>
            <LoginContextProvider>
              <AddTask />
            </LoginContextProvider>
            </TaskContextProvider>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
