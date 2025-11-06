// src/pages/AccessDenied.jsx
import React from 'react';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/UI/Button';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[460px] h-[400px] bg-white shadow-2xl rounded-3xl p-10 flex flex-col justify-center items-center text-center border border-gray-100"
      >
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-accent/10">
            <Lock size={56} className="text-accent" />
          </div>
        </div>

        <h1 className="mb-3 text-3xl font-semibold text-gray-800">
          Access Denied
        </h1>

        <p className="mb-8 text-gray-600 leading-relaxed text-[15px]">
          You don’t have permission to access this page.
          <br /> Please contact your system administrator if you believe this is a mistake.
        </p>

        {/* <Button
          onClick={() => navigate('/')}
          variant="primary"
          className="px-8 py-3 text-[15px] font-medium rounded-full shadow-md hover:opacity-90 transition-all"
        >
          Return to Home
        </Button> */}
      </motion.div>
    </div>
  );
};

export default AccessDenied;
