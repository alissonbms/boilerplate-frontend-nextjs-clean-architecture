/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/entities/User";

export default interface IUsersGateway {
  getUsers(): Promise<User[]>;
  setUser(user: any): Promise<User>;
}
