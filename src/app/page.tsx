"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./styles/page.module.scss";
import { useAppStore } from "./store";

export default function Home() {
  const [input, setInput] = useState("");
  const { users, setUsers } = useAppStore();

  const handleAddUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (/^\s/.test(input)) {
      alert("Empty field");
    } else {
      const newUser = {
        name: input,
        username: `${input}-username`,
        email: `${input}@email.com`,
      };

      const response = await fetch("http://localhost:3335/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      setUsers([...users, data]);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3335/users");
      const data = await response.json();

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
