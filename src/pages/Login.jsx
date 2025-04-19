import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import API from '../api/axios';
import useAuthStore from '../store/authStore';

export default function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();
    const location = useLocation(); // Get the previous location
    const { login } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const res = await API.post('/auth/login', { phone, password });
            login(res.data.user, res.data.token); // Save user data and token
            const redirectTo = location.state?.from?.pathname || '/'; // Redirect to the previous page or home
            navigate(redirectTo);
        } catch (err) {
            alert('Invalid credentials');
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    return (
        <div className="px-4 py-16 max-w-md mx-auto ">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    disabled={loading}
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
                            Logging in...
                        </div>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
            <p className="mt-2 text-sm">
                Don't have an account? <Link to="/signup" className="text-blue-500">Signup</Link>
            </p>
        </div>
    );
}
