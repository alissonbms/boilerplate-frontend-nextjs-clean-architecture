/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/entities/User";
import IUsersGateway from "./IUsersGateway";
import IHttpClient from "@/infra/IHttpClient";

export default class UsersHttpGateway implements IUsersGateway {
  protected users: User[];

  constructor(readonly httpClient: IHttpClient, readonly baseUrl: string) {
    this.users = [];
  }
  async getUsers(): Promise<User[]> {
    const data = await this.httpClient.get(`${this.baseUrl}/users`);

    const items: User[] = [];

    for (const user of data) {
      items.push(new User(user.id, user.name, user.username, user.email));
    }

    this.users = items;

    return items;
  }
  async setUser(user: any): Promise<User> {
    const newUser = {
      name: user.name,
      username: `${user.name}-username`,
      email: `${user.name}-@email.com`,
    };

    const data = await this.httpClient.post(`${this.baseUrl}/users`, newUser);

    this.users.push(data);

    return data;
  }
}
