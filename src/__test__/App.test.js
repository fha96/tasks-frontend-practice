import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("Load page", async () => {
  render(<App />, { wrapper:BrowserRouter});


  expect(screen.getByRole('header')).toHaveTextContent(/Follow up and Update your organization tasks here :)/);
});
