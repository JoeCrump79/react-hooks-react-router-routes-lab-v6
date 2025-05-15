import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { routesArray } from "../routes";

test("renders the Home component on route '/'", () => {
  const router = createMemoryRouter(routesArray, {
    initialEntries: ["/"],
  });
  render(<RouterProvider router={router} />);
  expect(screen.getByText(/Home Page/)).toBeInTheDocument();
});

test("renders the Actors component on route '/actors'", () => {
  const router = createMemoryRouter(routesArray, {
    initialEntries: ["/actors"],
  });
  render(<RouterProvider router={router} />);
  expect(screen.getByText(/Actors Page/)).toBeInTheDocument();
});

test("renders the Directors component on route '/directors'", () => {
  const router = createMemoryRouter(routesArray, {
    initialEntries: ["/directors"],
  });
  render(<RouterProvider router={router} />);
  expect(screen.queryByText(/Directors Page/)).toBeInTheDocument();
});

test("renders the Movie component on route '/movie/:id'", async () => {
  const id = 1;
  const router = createMemoryRouter(routesArray, {
    initialEntries: [`/movie/${id}`],
  });
  render(<RouterProvider router={router} />);
  expect(await screen.findByText(/Doctor Strange/)).toBeInTheDocument();
});

test("renders an error page when given a bad URL", () => {
  const router = createMemoryRouter(routesArray, {
    initialEntries: ["/bad-route"],
  });
  render(<RouterProvider router={router} />);
  expect(screen.getByText(/Oops! Looks like something went wrong./)).toBeInTheDocument();
});
