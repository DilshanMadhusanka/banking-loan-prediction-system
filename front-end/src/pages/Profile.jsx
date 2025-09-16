import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import { useToast } from '../contexts/ToastContext';
import { User, Mail, Phone, Calendar, Shield, Plus } from 'lucide-react';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const { user, logout } = useAuth();
  const { success, error } = useToast();

  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: 'User'
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userData = await userService.getUserProfile();
      setProfile(userData);
    } catch (err) {
      error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newUserData.name || !newUserData.email || !newUserData.password) {
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
      setNewUserData({ name: '', email: '', password: '', mobile: '', role: 'User' });
    } catch (err) {
      error('Failed to create user. Please try again.');
    } finally {
      setAddingUser(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      success('Logged out successfully');
    } catch (err) {
      error('Logout failed');
    }
  };

  const InfoCard = ({ icon: Icon, label, value, bgColor = 'bg-gray-50' }) => (
    <div className={`${bgColor} rounded-lg p-4 flex items-center`}>
      <div className="p-2 bg-white rounded-lg mr-4">
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
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card title="Profile Information">
            {profile && (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={profile.profileImage || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover shadow-bank"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                    <p className="text-gray-600">{profile.role || 'User'} • {profile.department || 'General'}</p>
                    <p className="text-sm text-gray-500">
                      Member since {new Date(profile.joinDate || profile.createdAt || Date.now()).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    icon={Mail}
                    label="Email Address"
                    value={profile.email || 'Not provided'}
                    bgColor="bg-blue-50"
                  />
                  
                  <InfoCard
                    icon={Phone}
                    label="Mobile Number"
                    value={profile.mobile || 'Not provided'}
                    bgColor="bg-green-50"
                  />
                  
                  <InfoCard
                    icon={Shield}
                    label="Role"
                    value={profile.role || 'User'}
                    bgColor="bg-purple-50"
                  />
                  
                  <InfoCard
                    icon={Calendar}
                    label="Join Date"
                    value={new Date(profile.joinDate || profile.createdAt || Date.now()).toLocaleDateString()}
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
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New User
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
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Total Predictions</span>
                <span className="font-semibold text-gray-900">1,247</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Files Uploaded</span>
                <span className="font-semibold text-gray-900">89</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Reports Generated</span>
                <span className="font-semibold text-gray-900">34</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
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
          
          <Input
            label="Mobile Number"
            type="tel"
            value={newUserData.mobile}
            onChange={(e) => setNewUserData(prev => ({ ...prev, mobile: e.target.value }))}
            placeholder="Enter mobile number"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={newUserData.role}
              onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Analyst">Analyst</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
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

export default Profile;