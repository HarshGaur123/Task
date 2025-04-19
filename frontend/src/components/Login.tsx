'use client'; 

import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');
  //   setSuccess('');
  
  //   try {
  //     const response = await fetch('http://localhost:5000/api/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email: uid, password }), // Use `email` if backend expects email
  //     });
  
  //     const data = await response.json();
  
  //     if (!response.ok) {
  //       throw new Error(data.message || 'Something went wrong');
  //     }
  
  //     setSuccess('Login successful!');
  //     console.log('Server Response:', data);
  
  //     // Example: Save user if needed
  //     // localStorage.setItem('user', JSON.stringify(data.user));
  
  //     // Redirect to Dashboard (if needed)
  //     // navigate('/dashboard');
  
  //   } catch (error: any) {
  //     setError(error.message || 'An error occurred');
  //     console.error('Login error:', error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    // Simple frontend validation
    if (!uid.includes('@')) {
      setError('Invalid email format. Must contain @');
      setLoading(false);
      return;
    }
  
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: uid, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
  
      setSuccess('Login successful!');
      console.log('Server Response:', data);
  
      // Save token or user data if needed
      // localStorage.setItem('user', JSON.stringify(data.user));
  
    } catch (error: any) {
      setError(error.message || 'An error occurred');
      console.error('Login error:', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', width: '300px' }}>
        <h2 style={{ textAlign: 'center' }}>Welcome back!</h2>

        <input
          type="text"
          placeholder="UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
          required
        />

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', background: '#283593', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
