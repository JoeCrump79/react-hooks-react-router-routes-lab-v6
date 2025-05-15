import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { routesArray } from "../routes";

const router = createMemoryRouter(routesArray, {
  initialEntries: ["/"],
  initialIndex: 0,
});

test("renders 'Home Page' inside of an <h1 />", () => {
  render(<RouterProvider router={router} />);
  const h1 = screen.queryByText(/Home Page/);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("Displays a list of movie titles", async () => {
  render(<RouterProvider router={router} />);
  const titleList = await screen.findAllByRole("heading", { level: 2 });
  expect(titleList.length).toBeGreaterThan(1);
  expect(titleList[0].tagName).toBe("H2");
  expect(titleList[0].textContent).toBe("Doctor Strange");
});

test("Displays links for each associated movie", async () => {
  render(<RouterProvider router={router} />);
  const linkList = await screen.findAllByText(/View Info/);
  expect(linkList.length).toBeGreaterThan(1);
  expect(linkList[0].href.split("/").slice(3).join("/")).toBe("movie/1");
});

test("renders the <NavBar /> component", () => {
  render(<RouterProvider router={router} />);
  expect(document.querySelector(".navbar")).toBeInTheDocument();
});
