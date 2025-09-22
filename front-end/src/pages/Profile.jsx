import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import { useToast } from '../contexts/ToastContext';
import { User, Mail, Phone, Calendar, Shield, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const { user, logout } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

 const [newUserData, setNewUserData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const result = await userService.getUserProfile();
      setProfile(result.user);
    } catch (err) {
      error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newUserData.name ||!newUserData.username || !newUserData.email || !newUserData.password  ) {
      error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUserData.email)) {
      error('Please enter a valid email address');
      return;
    }

    // Password validation
    if (newUserData.password.length < 6) {
      error('Password must be at least 6 characters long');
      return;
    }

    setAddingUser(true);

    try {
      await userService.createUser(newUserData);
      success('User created successfully!');
      setShowAddUserModal(false);
      setNewUserData({ name: '', username: '', email: '', password: '' });
    } catch (err) {
      error('Failed to create user. Please try again.');
    } finally {
      setAddingUser(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); 
      success('Logged out successfully');
    } catch (err) {
      error('Logout failed');
    }
  };



  const InfoCard = ({ icon: Icon, label, value, bgColor = 'bg-gray-50' }) => (
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
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your profile and user settings</p>
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
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your profile and user settings</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card title="Profile Information">
            {profile && (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="object-cover w-24 h-24 rounded-full shadow-bank"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                    <p className="text-gray-600">{profile.role} • {profile.department}</p>
                    <p className="text-sm text-gray-500">
                      Member since {new Date(profile.joinDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InfoCard
                    icon={Mail}
                    label="Email Address"
                    value={profile.email}
                    bgColor="bg-blue-50"
                  />
                  
                  <InfoCard
                    icon={Phone}
                    label="Mobile Number"
                    value={profile.mobile}
                    bgColor="bg-green-50"
                  />
                  
                  <InfoCard
                    icon={Shield}
                    label="Role"
                    value={profile.role}
                    bgColor="bg-purple-50"
                  />
                  
                  <InfoCard
                    icon={Calendar}
                    label="Join Date"
                    value={new Date(profile.joinDate).toLocaleDateString()}
                    bgColor="bg-yellow-50"
                  />
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
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

          {/* Account Statistics */}
          <Card title="Account Statistics">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Total Predictions</span>
                <span className="font-semibold text-gray-900">1,247</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Files Uploaded</span>
                <span className="font-semibold text-gray-900">89</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Reports Generated</span>
                <span className="font-semibold text-gray-900">34</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Active Sessions</span>
                <span className="font-semibold text-green-600">2</span>
              </div>
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
      onChange={(e) => setNewUserData(prev => ({ ...prev, name: e.target.value }))}
      placeholder="Enter full name"
      required
    />

    <Input
      label="Username"
      value={newUserData.username}
      onChange={(e) => setNewUserData(prev => ({ ...prev, username: e.target.value }))}
      placeholder="Enter username"
      required
    />
    
    <Input
      label="Email Address"
      type="email"
      value={newUserData.email}
      onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
      placeholder="Enter email address"
      required
    />
    
    <Input
      label="Password"
      type="password"
      value={newUserData.password}
      onChange={(e) => setNewUserData(prev => ({ ...prev, password: e.target.value }))}
      placeholder="Enter password (minimum 6 characters)"
      required
    />

    <div className="flex pt-4 space-x-3">
      <Button
        type="submit"
        loading={addingUser}
        disabled={addingUser}
        className="flex-1"
        onClick={handleAddUser}
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

export default Profile;