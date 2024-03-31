"use client";
import { useEnv } from "@/env/provider";

export const MyClientComponent = () => {
  const env = useEnv();

  return (
    <div>
      <h1>This is rendered in a client component.</h1>
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
