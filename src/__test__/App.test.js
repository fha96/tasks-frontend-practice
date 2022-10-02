import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("Load page", async () => {
  render(<App />, { wrapper:BrowserRouter});
    const check = await waitFor(() => screen.findByTestId('head'));
    console.log(check);
    expect(check).toBeVisible();
});