"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./styles/page.module.scss";
import { useAppStore } from "./store";
import UsersHttpGateway from "@/gateways/Users/UsersHttpGateway";
import { container, Registry } from "@/infra/ContainerRegistry";

export default function Home() {
  const rendering = useRef(0);
  const [usersHttp, setUsersHttp] = useState<UsersHttpGateway>();
  const [input, setInput] = useState("");
  const { users, setUsers } = useAppStore();

  useEffect(() => {
    if (rendering.current === 1) return;

    setUsersHttp(container.get<UsersHttpGateway>(Registry.UsersHttpGateway));

    rendering.current = 1;
  }, [usersHttp]);

  const handleAddUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!usersHttp) return;

    if (/^\s/.test(input)) {
      alert("Empty field");
    } else {
      const newUser = {
        name: input,
      };

      const data = await usersHttp.setUser(newUser);

      setUsers([...users, data]);
    }
  };

  useEffect(() => {
    (async () => {
      if (!usersHttp) return;

      const data = await usersHttp.getUsers();

      setUsers([...users, data]);
    })();
  }, []);

  return (
    <div
      className={styles.container}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        padding: "10px",
      }}
    >
      <h1>Hello world</h1>
      <form onSubmit={(e) => handleAddUser(e)}>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          required={true}
        />
        <button type="submit">Add user</button>
      </form>
      <ul style={{ paddingLeft: "20px" }}>
        {users.map((user) => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
