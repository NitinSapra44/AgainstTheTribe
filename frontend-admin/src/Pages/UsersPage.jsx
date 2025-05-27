import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get("/user/all").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div onClick={()=>{navigate(`/user/${user._id}`)}}
            key={user._id}
            className="bg-white rounded-xl shadow p-4 border cursor-pointer border-gray-100 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h2>
            <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Email:</span> {user.email}</p>
            <p className="text-xs text-gray-400 break-all"><span className="font-medium">User ID:</span> {user._id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
