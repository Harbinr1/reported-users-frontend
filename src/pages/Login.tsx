import { apiConfig } from '../config/apiConfig';
import React, { useState } from 'react';
import { TOKEN_KEY, isAuthenticated } from '@/lib/auth'; // ✅ Keep this one

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      console.log('Starting login attempt...');

      const response = await fetch(apiConfig.endpoints.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        mode: 'cors'
      });

      console.log('Response received:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        throw new Error(errorText || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful, token received');

      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        console.log('Token stored with key:', TOKEN_KEY);
        console.log('Token value in storage:', localStorage.getItem(TOKEN_KEY));
        console.log('isAuthenticated():', isAuthenticated());
        window.location.href = '/';
      } else {
        throw new Error('No token received from server');
      }
    } catch (err: any) {
      console.error('Login error details:', {
        message: err.message,
        stack: err.stack
      });
      setError('Connection failed. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full relative">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <form className="bg-white p-8 rounded shadow-md w-80" onSubmit={handleLogin}>
          <h2 className="text-2xl mb-6 text-center">Login</h2>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}