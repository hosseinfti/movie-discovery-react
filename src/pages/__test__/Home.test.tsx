import { render, screen, waitFor } from "@testing-library/react";
import Home from "../../pages/Home";
import * as api from "../../features/movies/api/tmdApi";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const mockMovies = {
  results: [
    { id: 1, title: "Movie A", poster_path: "/a.jpg" },
    { id: 2, title: "Movie B", poster_path: "/b.jpg" },
  ],
  total_pages: 10,
};

jest.mock("../../features/movies/api/tmdApi", () => ({
  fetchMovies: jest.fn(() =>
    Promise.resolve([
      { id: 1, title: "Mock Movie 1" },
      { id: 2, title: "Mock Movie 2" },
    ])
  ),
}));
describe("Home page", () => {
  it("should fetch and render movies", async () => {
    (api.fetchMovies as jest.Mock).mockResolvedValue(mockMovies);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Movie A")).toBeInTheDocument();
      expect(screen.getByText("Movie B")).toBeInTheDocument();
    });
  });
});
