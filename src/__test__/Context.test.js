import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { AddTask } from "../components/update/AddTask";
import LoginContextProvider from "../context/LoginContext";

test("Load page", async () => {
  render(
    <LoginContextProvider>
      <AddTask />
    </LoginContextProvider>,
    { wrapper: BrowserRouter }
  );
  const check = screen.getByTestId("task");
  console.log(check);
  expect(check).toBeVisible();
});
