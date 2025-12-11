import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const Account = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // This would call an update profile endpoint on the backend
      // For now, we'll just show a success message
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      // This would call a change password endpoint on the backend
      // For now, we'll just show a success message
      setSuccess('Password changed successfully!');
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#2c3e50', color: '#ffffff', padding: '2rem 0', borderBottom: '1px solid #34495e' }}>
        <div className="container-centered">
          <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 style={{ color: '#ffffff', margin: 0, fontSize: '2rem', fontWeight: '700' }}>Account Settings</h1>
            <p style={{ color: '#bdc3c7', margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>Manage your account and preferences</p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-light btn-sm"
          >
            Back to Dashboard
          </button>
          </div>
        </div>
      </header>

      <main className="container-centered" style={{ padding: '3rem 0' }}>
        <div className="card">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-5 font-semibold text-center transition text-base ${
                activeTab === 'profile'
                  ? 'border-b-4 border-purple-600 text-purple-600'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 py-5 font-semibold text-center transition text-base ${
                activeTab === 'password'
                  ? 'border-b-4 border-purple-600 text-purple-600'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-5 font-semibold text-center transition text-base ${
                activeTab === 'security'
                  ? 'border-b-4 border-purple-600 text-purple-600'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Security
            </button>
          </div>

          <div className="p-10">
            {error && (
              <div className="alert-error px-6 py-4 rounded-lg mb-8">
                {error}
              </div>
            )}
            {success && (
              <div className="alert-success px-6 py-4 rounded-lg mb-8">
                {success}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileUpdate}>
                <div className="mb-8">
                  <label className="block text-gray-900 font-semibold mb-3">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                <div className="mb-10">
                  <label className="block text-gray-900 font-semibold mb-3">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-white font-semibold py-3 px-8 rounded-lg transition"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordChange}>
                <div className="mb-8">
                  <label className="block text-gray-900 font-semibold mb-3">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900"
                    placeholder="••••••••"
                  />
                </div>
                <div className="mb-8">
                  <label className="block text-gray-900 font-semibold mb-3">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900"
                    placeholder="••••••••"
                  />
                </div>
                <div className="mb-10">
                  <label className="block text-gray-900 font-semibold mb-3">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-white font-semibold py-3 px-8 rounded-lg transition"
                >
                  {loading ? 'Changing Password...' : 'Change Password'}
                </button>
              </form>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Account Security</h3>
                <div className="space-y-4">
                  <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h4>
                    <p className="text-gray-700 text-sm mb-4">Add an extra layer of security to your account.</p>
                    <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm transition">
                      Enable 2FA
                    </button>
                  </div>
                  <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Active Sessions</h4>
                    <p className="text-gray-700 text-sm mb-4">Manage your active sessions and devices.</p>
                    <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm transition">
                      View Sessions
                    </button>
                  </div>
                  <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Delete Account</h4>
                    <p className="text-gray-700 text-sm mb-4">
                      Permanently delete your account and all associated data.
                    </p>
                    <button className="text-red-600 hover:text-red-700 font-semibold text-sm transition">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-10 flex justify-end gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-secondary text-gray-900 font-semibold py-2 px-6 rounded-lg transition"
            >
              Close
            </button>
            <button
              onClick={handleLogout}
              className="btn-danger text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
