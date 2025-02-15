import UsersHttpGateway from "@/gateways/Users/UsersHttpGateway";
import { Container } from "inversify";
import FetchAdapter from "./adapters/FetchAdapter";
import AxiosAdapter from "./adapters/AxiosAdapter";

export const Registry = {
  UsersHttpGateway: Symbol.for("UsersHttpGateway"),
  FetchAdapter: Symbol.for("FetchAdapter"),
  AxiosAdapter: Symbol.for("AxiosAdapter"),
};

export const container = new Container();

container.bind(Registry.FetchAdapter).toDynamicValue(() => {
  return new FetchAdapter();
});

container.bind(Registry.AxiosAdapter).toDynamicValue(() => {
  return new AxiosAdapter();
});

container.bind(Registry.UsersHttpGateway).toDynamicValue((context) => {
  return new UsersHttpGateway(
    context.container.get(Registry.FetchAdapter),
    "http://localhost:3335",
  );
});
