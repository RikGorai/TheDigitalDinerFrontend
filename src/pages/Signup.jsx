import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import useAuthStore from '../store/authStore';

export default function Signup() {
    const navigate = useNavigate();
    const { login } = useAuthStore(); // Access the login function from the auth store
    const [loading, setLoading] = useState(false); // Add loading state
    const [credentials, setCredentials] = useState({ name: '', phone: '', password: '' }); // Ensure phone is included

    const handleSignup = async () => {
        setLoading(true); // Set loading to true
        try {
            const res = await API.post('/auth/signup', credentials); // Ensure the correct endpoint is used
            const { user, token } = res.data; // Extract user and token from the response
            localStorage.setItem('user', JSON.stringify(user)); // Save user data in localStorage
            localStorage.setItem('token', token); // Save token in localStorage
            login(user, token); // Automatically log in the user
            alert('Signup successful! Redirecting to home...');
            navigate('/'); // Redirect to home after successful signup and login
        } catch (err) {
            console.error('Signup failed:', err);
            alert('Signup failed. Please try again.');
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    return (
        <div className="px-4 py-16 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            <input
                type="text"
                placeholder="Name"
                value={credentials.name}
                onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
                required
            />
            <input
                type="text"
                placeholder="Phone"
                value={credentials.phone}
                onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
                required
            />
            <button
                onClick={handleSignup}
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={loading} // Disable button while loading
            >
                {loading ? (
                    <div className="flex items-center justify-center">
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        Signing up...
                    </div>
                ) : (
                    'Signup'
                )}
            </button>
        </div>
    );
}
