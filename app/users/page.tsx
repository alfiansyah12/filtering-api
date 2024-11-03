"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { FiMail, FiPhone, FiUser } from "react-icons/fi"; 

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await response.json();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.id.toString().includes(search) ||
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by ID, name, username, email, or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-start space-y-3">
                {/* Name and Username */}
                <div className="flex items-center space-x-2">
                  <FiUser className="text-gray-500" />
                  <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                </div>
                <p className="text-gray-500 text-sm">@{user.username}</p>
                
                {/* Email */}
                <div className="flex items-center space-x-2 text-gray-700">
                  <FiMail className="text-blue-500" />
                  <span className="text-sm">{user.email}</span>
                </div>
                
                {/* Phone */}
                <div className="flex items-center space-x-2 text-gray-700">
                  <FiPhone className="text-green-500" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
