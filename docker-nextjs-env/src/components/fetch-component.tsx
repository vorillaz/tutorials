"use client";
import { useState, useEffect } from "react";

export const MyFetchComponent = () => {
  const [env, setEnv] = useState({});

  useEffect(() => {
    fetch("/env")
      .then((res) => res.json())
      .then((data) => setEnv(data));
  }, []);

  return (
    <div>
      <h1>This is rendered in a fetch component.</h1>
      <pre
        style={{
          padding: "1rem",
          backgroundColor: "#f4f4f4",
          border: "1px solid #ccc",
          borderRadius: "5px",
          margin: "1rem 0",
        }}
      >
        {JSON.stringify(env, null, 2)}
      </pre>
    </div>
  );
};
