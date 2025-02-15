/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/entities/User";
import IUsersGateway from "./IUsersGateway";
import { injectable } from "inversify";

injectable();
export default class UsersInMemoryGateway implements IUsersGateway {
  protected users: User[];

  constructor() {
    this.users = [];
  }
  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async setUser(user: any): Promise<User> {
    const newUser = {
      id: this.users.length ? this.users[this.users.length - 1].id + 1 : 1,
      name: user.name,
      username: `${user.name}-username`,
      email: `${user.name}-email`,
    };

    this.users.push(newUser);

    return newUser;
  }
}
