import React, { useState, useEffect } from "react";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import { useAuth } from "../contexts/AuthContext";
import { userService } from "../services/userService";
import { useToast } from "../contexts/ToastContext";
import { Users, Mail, Phone, Calendar, Shield, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dashboardService } from "../services/dashboardService";

function UserManagement() {
  const [profile, setProfile] = useState(null);
  const [editableProfile, setEditableProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const [editing, setEditing] = useState(false);
  const { user, logout } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [newUserData, setNewUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    roleId: "",
    mobile:""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await dashboardService.getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const result = await userService.getUserProfile();
      setProfile(result.user);
      setEditableProfile(result.user);
    } catch (err) {
      error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (user) => {
    const userProfile = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      department: user.department || "N/A",
      mobile: user.mobile,
      profileImage:
        user.profileImage ||
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
      joinDate: user.createdAt,
    };
    setProfile(userProfile);
    setEditableProfile(userProfile);
    setSelectedUserId(user.id);
    setEditing(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (
      !newUserData.name ||
      !newUserData.username ||
      !newUserData.email ||
      !newUserData.password ||
      !newUserData.roleId
    ) {
      error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUserData.email)) {
      error("Please enter a valid email address");
      return;
    }

    if (newUserData.password.length < 6) {
      error("Password must be at least 6 characters long");
      return;
    }

    setAddingUser(true);

    try {
      await userService.createUser(newUserData);
      success("User created successfully!");
      setShowAddUserModal(false);
      setNewUserData({
        name: "",
        username: "",
        email: "",
        password: "",
        roleId: "",
        mobile:""
      });

      const updatedUsers = await dashboardService.getAllUsers();
      setUsers(updatedUsers);
    } catch (err) {
      error(err.message);
    } finally {
      setAddingUser(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      success("Logged out successfully");
    } catch (err) {
      error("Logout failed");
    }
  };

  // const handleSaveProfile = async () => {
  //   try {
  //     await userService.updateUserProfile(editableProfile.id, editableProfile);
  //     success("Profile updated successfully!");
  //     setProfile(editableProfile);
  //     setEditing(false);

  //     const updatedUsers = await dashboardService.getAllUsers();
  //     setUsers(updatedUsers);
  //   } catch (err) {
  //     error("Failed to update profile");
  //   }
  // };


const handleSaveProfile = async () => {
  try {
    if (!editableProfile.id) {
      error("No user selected");
      return;
    }

    await userService.updateUser(editableProfile.id, {
      name: editableProfile.name,
      email: editableProfile.email,
      mobile: editableProfile.mobile,
      roleId:
        editableProfile.role === "ADMIN"
          ? 1
          : editableProfile.role === "MANAGER"
          ? 2
          : 3,
    });

    success("Profile updated successfully!");
    setProfile(editableProfile);
    setEditing(false);

    const updatedUsers = await dashboardService.getAllUsers();
    setUsers(updatedUsers);
  } catch (err) {
    error(err.message || "Failed to update profile");
  }
};

  
  const InfoCard = ({ icon: Icon, label, value, bgColor = "bg-gray-50" }) => (
    <div className={`${bgColor} rounded-lg p-4 flex items-center`}>
      <div className="p-2 mr-4 bg-white rounded-lg">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage profile and user settings</p>
        </div>
        <div className="py-12 text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-2 rounded-full border-accent border-t-transparent animate-spin"></div>
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage profiles and user settings</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card title="Profile Information">
            {editableProfile && (
              <>
                {editing ? (
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      value={editableProfile.name}
                      onChange={(e) =>
                        setEditableProfile((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                    <Input
                      label="Email"
                      value={editableProfile.email}
                      onChange={(e) =>
                        setEditableProfile((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                    <Input
                      label="Mobile"
                      value={editableProfile.mobile}
                      onChange={(e) =>
                        setEditableProfile((prev) => ({
                          ...prev,
                          mobile: e.target.value,
                        }))
                      }
                    />
                    {/* <select
                     label="Role"
                      value={editableProfile.role}
                      onChange={(e) =>
                        setEditableProfile((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="STAFF">STAFF</option>
                    </select> */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select
                        value={editableProfile.role}
                        onChange={(e) =>
                          setEditableProfile((prev) => ({
                            ...prev,
                            role: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="STAFF">STAFF</option>
                      </select>
                    </div>

                    <div className="flex space-x-3">
                      <Button onClick={handleSaveProfile} className="flex-1">
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditing(false)}
                        variant="secondary"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <img
                          src={editableProfile.profileImage}
                          alt="Profile"
                          className="object-cover w-24 h-24 rounded-full shadow-bank"
                        />
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {editableProfile.name}
                        </h2>
                        <p className="text-gray-600">
                          {editableProfile.role} • {editableProfile.department}
                        </p>
                        <p className="text-sm text-gray-500">
                          Member since{" "}
                          {new Date(
                            editableProfile.joinDate
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <InfoCard
                        icon={Mail}
                        label="Email Address"
                        value={editableProfile.email}
                        bgColor="bg-blue-50"
                      />
                      <InfoCard
                        icon={Phone}
                        label="Mobile Number"
                        value={editableProfile.mobile}
                        bgColor="bg-green-50"
                      />
                      <InfoCard
                        icon={Shield}
                        label="Role"
                        value={editableProfile.role}
                        bgColor="bg-purple-50"
                      />
                      <InfoCard
                        icon={Calendar}
                        label="Join Date"
                        value={new Date(
                          editableProfile.joinDate
                        ).toLocaleDateString()}
                        bgColor="bg-yellow-50"
                      />
                    </div>

                    <Button onClick={() => setEditing(true)} className="mt-4">
                      Edit Profile
                    </Button>
                  </div>
                )}
              </>
            )}
          </Card>
        </div>

        {/* Quick Actions & User List */}
        <div className="space-y-6">
          <Card title="Quick Actions">
            <div className="space-y-3">
              <Button
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center justify-center w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span>Add New User</span>
              </Button>

              <Button
                onClick={handleLogout}
                variant="danger"
                className="w-full"
              >
                Logout
              </Button>
            </div>
          </Card>

          <Card title="All Users" className="shadow-bank">
            <div className="grid grid-cols-1 gap-4 bg-white md:grid-cols-1 lg:grid-cols-1">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className={`flex items-start p-3 space-x-4 transition bg-gray-400 rounded-lg shadow-sm bg-opacity-10 hover:shadow-md hover:bg-opacity-20 cursor-pointer ${
                      selectedUserId === user.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="p-3 mt-4 rounded-full bg-accent bg-opacity-10">
                      <Users className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-700">
                        Username: {user.username}
                      </p>
                      <p className="text-sm text-gray-700">
                        Email: {user.email}
                      </p>
                      <p className="text-sm text-gray-700">
                        Role:{" "}
                        {user.role.charAt(0).toUpperCase() +
                          user.role.slice(1).toLowerCase()}
                      </p>
                      {/* <p className="mt-1 text-xs text-gray-500">
                        Joined: {new Date(user.createdAt).toLocaleString()}
                      </p> */}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No users found.</p>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Add New User Modal */}
      <Modal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        title="Add New User"
        size="md"
      >
        <form onSubmit={handleAddUser} className="space-y-4">
          <Input
            label="Full Name"
            value={newUserData.name}
            onChange={(e) =>
              setNewUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter full name"
            required
          />
          <Input
            label="Username"
            value={newUserData.username}
            onChange={(e) =>
              setNewUserData((prev) => ({ ...prev, username: e.target.value }))
            }
            placeholder="Enter username"
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={newUserData.email}
            onChange={(e) =>
              setNewUserData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Enter email address"
            required
          />
          <Input
            label="Mobile"
            value={newUserData.mobile}
            onChange={(e) =>
              setNewUserData((prev) => ({ ...prev, mobile: e.target.value }))
            }
            placeholder="Enter Mobile"
            required
          />
          <Input
            label="Password"
            type="password"
            value={newUserData.password}
            onChange={(e) =>
              setNewUserData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Enter password (minimum 6 characters)"
            required
          />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={newUserData.roleId || ""}
              onChange={(e) =>
                setNewUserData((prev) => ({ ...prev, roleId: e.target.value }))
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="1">ADMIN</option>
              <option value="2">MANAGER</option>
              <option value="3">STAFF</option>
            </select>
          </div>

          <div className="flex pt-4 space-x-3">
            <Button
              type="submit"
              loading={addingUser}
              disabled={addingUser}
              className="flex-1"
            >
              Create User
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAddUserModal(false)}
              disabled={addingUser}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default UserManagement;
