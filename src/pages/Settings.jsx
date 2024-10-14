import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [kycDocument, setKycDocument] = useState(null);
  const [kycStatus, setKycStatus] = useState('Pending'); // Default status is 'Pending'

  const handleFileChange = (e) => {
    setKycDocument(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('kycDocument', kycDocument);
    formData.append('userId', 'user123'); // Replace with dynamic user ID

    try {
      const response = await axios.post('/api/kyc/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setKycStatus(response.data.user.kycStatus);
      alert('KYC document uploaded successfully!');
    } catch (error) {
      console.error('Error uploading KYC document', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Settings</h2>
        <p className="text-center text-gray-600 mb-6">Manage your account settings, including KYC verification.</p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">KYC Status: <span className="text-orange-600">{kycStatus}</span></h3>

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload KYC Document</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-darkPriamry text-white py-2 rounded-lg hover:bg-blue-900 transition-all"
            >
              Upload Document
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
