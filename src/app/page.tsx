"use client";

import { FormEvent, useState } from "react";
import styles from "./styles/page.module.scss";
import { useAppStore } from "./store";

export default function Home() {
  const [input, setInput] = useState("");
  const { users, setUsers } = useAppStore();

  function handleAddUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (/^\s/.test(input)) {
      alert("Empty field");
    } else {
      const newUser = {
        id: Math.floor(Math.random() * 10000),
        name: input,
      };
      setUsers([...users, newUser]);
    }
  }

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
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
