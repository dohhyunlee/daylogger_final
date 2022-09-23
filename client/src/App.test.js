import { screen, render, shallow, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import {
  getAllQAPIMethod,
  createQAPIMethod,
  deleteQByIdAPIMethod,
  updateQAPIMethod,
  getAllAnswersAPIMethod,
  getUsersAPIMethod, deleteUserByIdAPIMethod, getUserAPIMethod, createUsersAPIMethod, getAdminAPIMethod
} from "./api/client";
import Edit from "./components/Edit";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import LogData from "./components/LogData";

import TopBar from "./components/TopBar";
import ViewData from "./components/ViewData";
const date = new Date();

test("TopBar rendering", () => {
  render(<TopBar />);
  const topBar = screen.getByText("Day Logger");
  expect(topBar).toBeVisible;
})

test("ViewData rendering", () => {
  render(<ViewData />);
  const topBar = screen.getByText("Download Data");
  expect(topBar).toBeVisible;
})

test("EditPage rendering", () => {
  render(<Edit />);
  const topBar = screen.getByText("Edit Questions");
  expect(topBar).toBeVisible;
})

test("LoginPage rendering", () => {
  render(<LoginPage />);
  const topBar = screen.getByText("Day Logger");
  expect(topBar).toBeVisible;
})

test("date", () => {
  render(<ViewData />);

  const target = screen.getByText("Date");
  userEvent.click(target);
  expect(screen.getByText(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`)).toBeTruthy();
})

test("LogData chevron_left rendering", () => {
  render(<LogData />);
  const target = screen.getByText("chevron_left");
  expect(target).toBeVisible;
})

