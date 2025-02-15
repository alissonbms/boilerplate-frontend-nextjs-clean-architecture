import UsersHttpGateway from "@/gateways/Users/UsersHttpGateway";
import { Container } from "inversify";

export const Registry = {
  UsersHttpGateway: Symbol.for("UsersHttpGateway"),
};

export const container = new Container();

container.bind(Registry.UsersHttpGateway).toDynamicValue(() => {
  return new UsersHttpGateway();
});
