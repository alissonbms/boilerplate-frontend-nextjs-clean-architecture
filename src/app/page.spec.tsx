import Home from "./page";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { useAppStore } from "./store";
describe("Test Home page", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAppStore());

    waitFor(() => {
      result.current.setUsers([]);
    });
  });

  test("Should show an users list on screen", async () => {
    render(<Home />);

    const usersList = screen.getByRole("list");
    expect(usersList).toBeInTheDocument();
  });

  test("Should add a new user to list (by fireEvent)", async () => {
    render(<Home />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "John" } });
    fireEvent.click(button);

    expect(await screen.findByText("John")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Jane" } });
    fireEvent.click(button);

    expect(await screen.findByText("Jane")).toBeInTheDocument();

    const users = screen.getAllByRole("listitem");
    expect(users).toHaveLength(2);
  });

  test("Should add a new user to list (by mocks)", async () => {
    const { result } = renderHook(() => useAppStore());

    waitFor(() => {
      result.current.setUsers([
        {
          name: "Mike",
        },
        {
          name: "Chloe",
        },
        {
          name: "Ashley",
        },
      ]);
    });

    render(<Home />);

    const users = screen.getAllByRole("listitem");
    expect(users).toHaveLength(3);
  });
});
