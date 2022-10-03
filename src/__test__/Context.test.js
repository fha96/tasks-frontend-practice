import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import LoginContextProvider, { LoginContext } from "../context/LoginContext";
import { Signin } from "../components/registration/Signin";
test("Load page", async () => {
  render(
    <LoginContextProvider>
      <Signin />
    </LoginContextProvider>,
    { wrapper: BrowserRouter }
    )

    expect(1).toBeTruthy();

});
