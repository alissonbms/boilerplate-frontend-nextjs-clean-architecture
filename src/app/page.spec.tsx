import Home from "./page";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { useAppStore } from "../store";
import { container, Registry } from "@/infra/ContainerRegistry";
import UsersInMemoryGateway from "@/gateways/Users/UsersInMemoryGateway";
describe("Test Home page", () => {
  beforeEach(() => {
    container.rebind(Registry.UsersHttpGateway).to(UsersInMemoryGateway);

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
          id: 1,
          name: "Mike",
        },
        {
          id: 2,
          name: "Chloe",
        },
        {
          id: 3,
          name: "Ashley",
        },
      ]);
    });

    render(<Home />);

    const users = screen.getAllByRole("listitem");
    expect(users).toHaveLength(3);
  });
});
