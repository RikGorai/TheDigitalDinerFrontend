import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useState } from 'react';

export default function Nav() {
    const { token, user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation(); 
    const [menuOpen, setMenuOpen] = useState(false); 

    return (
        <nav className="fixed top-0 right-0 left-0 bg-transparent shadow-md z-50 p-4 flex justify-between items-center text-gray-300">
            {location.pathname !== '/' && ( 
                <button
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-gray-300 hover:text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back</span>
                </button>
            )}
            {location.pathname !== '/' && ( // Show "The Digital Diner" only on non-home pages
                <h1
                    onClick={() => navigate('/')} // Redirect to home when clicked
                    className="absolute left-1/2 transform -translate-x-1/2 text-xl md:text-2xl font-serif font-bold cursor-pointer text-white hover:text-gray-300"
                >
                    The Digital Diner
                </h1>
            )}
            <div className="hidden md:flex gap-4 ml-auto"> 
                {token ? (
                    <>
                        {user?.role === 'admin' && (
                            <>
                                <button
                                    onClick={() => navigate('/add-menu-item')}
                                    className="hover:text-green-400"
                                >
                                    Add Menu Item
                                </button>
                                <button
                                    onClick={() => navigate('/remove-menu-item')}
                                    className="hover:text-red-400"
                                >
                                    Remove Menu Item
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => navigate('/orders')}
                            className="hover:text-blue-400"
                        >
                            Order History
                        </button>
                        <button
                            onClick={() => {
                                logout();
                                navigate('/');
                            }}
                            className="hover:text-red-400"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-blue-400">Login</Link>
                        <Link to="/signup" className="hover:text-green-400">Signup</Link>
                    </>
                )}
            </div>
            <div className="relative md:hidden ml-auto"> {/* Mobile view */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)} // Toggle dropdown menu
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full text-gray-300 hover:bg-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    <span>Menu</span>
                </button>
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        {token ? (
                            <>
                                {user?.role === 'admin' && (
                                    <>
                                        <button
                                            onClick={() => {
                                                navigate('/add-menu-item');
                                                setMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                        >
                                            Add Menu Item
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate('/remove-menu-item');
                                                setMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                        >
                                            Remove Menu Item
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => {
                                        navigate('/orders');
                                        setMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                >
                                    Order History
                                </button>
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate('/');
                                        setMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setMenuOpen(false)}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
