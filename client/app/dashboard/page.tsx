"use client";

import { useEffect, useState } from "react";

type PasswordsProps = {
  website: string;
  username: string;
  password: string;
};

export default function Dashboard() {
  const [passwords, setPasswords] = useState<PasswordsProps[]>([]);

  
  useEffect(() => {
    const getUserPasswords = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/get-passwords", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPasswords(data);
    };
    
    getUserPasswords();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {passwords.map((p: PasswordsProps, index) => (
        <div key={index} className="bg-zinc-900 p-4 rounded-xl mb-4">
          <p>
            <strong>Website:</strong> {p.website}
          </p>
          <p>
            <strong>Username:</strong> {p.username}
          </p>
          <p>
            <strong>Password:</strong> {p.password}
          </p>
        </div>
      ))}
    </main>
  );
}
