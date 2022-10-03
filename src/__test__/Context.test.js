import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import LoginContextProvider from "../context/LoginContext";
import { Signin } from "../components/registration/Signin";

test("Load page", async () => {
  render(
    <LoginContextProvider>
      <Signin />
    </LoginContextProvider>,
    { wrapper: BrowserRouter }
  )

  const check =  fireEvent.click(screen.getByTestId('test')).valueOf();
    
});
