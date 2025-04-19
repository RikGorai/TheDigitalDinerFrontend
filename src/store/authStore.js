import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null, // Load user data from localStorage
    token: localStorage.getItem('token') || null, // Load token from localStorage

    login: (user, token) => {
        localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage
        localStorage.setItem('token', token); // Save token to localStorage
        set({ user, token });
    },

    logout: () => {
        localStorage.removeItem('user'); // Remove user data from localStorage
        localStorage.removeItem('token'); // Remove token from localStorage
        set({ user: null, token: null });
    },
}));

export default useAuthStore;