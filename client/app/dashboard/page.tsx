"use client";

import { useEffect, useState } from "react";

type PasswordsProps = {
  id: number;
  website: string;
  username: string;
  password: string;
};

export default function Dashboard() {
  const [passwords, setPasswords] = useState<PasswordsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserPasswords = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const res = await fetch("http://127.0.0.1:8000/get-passwords", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setError("Something went wrong fetching passwords");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setPasswords(data);
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    getUserPasswords();
  }, []);

  const deletePassword = async (id: number) => {
    console.log(id)
    const token = localStorage.getItem("token");

    await fetch(`http://127.0.0.1:8000/delete-password/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPasswords((pre) => pre.filter(p => p.id != id));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading passwords...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </main>
    );
  }
  console.log(passwords)
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {passwords.map((p: PasswordsProps) => (
        <div key={p.website} className="bg-zinc-900 p-4 rounded-xl mb-4">
          <p>
            <strong>Website:</strong> {p.website}
          </p>
          <p>
            <strong>Username:</strong> {p.username}
          </p>
          <p>
            <strong>Password:</strong> {p.password}
          </p>

          <button
            onClick={() => deletePassword(p.id)}
            className="mt-3 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}
