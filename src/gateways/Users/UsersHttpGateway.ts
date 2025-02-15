/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/entities/User";
import IUsersGateway from "./IUsersGateway";

export default class UsersHttpGateway implements IUsersGateway {
  protected users: User[];

  constructor() {
    this.users = [];
  }
  async getUsers(): Promise<User[]> {
    const response = await fetch("http://localhost:3335/users");

    const data = await response.json();

    return data;
  }
  async setUser(user: any): Promise<User> {
    const newUser = {
      name: user.name,
      username: `${user.name}-username`,
      email: `${user.name}-email`,
    };
    const response = await fetch("http://localhost:3335/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();

    this.users.push(data);

    return data;
  }
}
