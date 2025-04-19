import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    login: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token }); // Ensure user object with role is stored
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },
}));

export default useAuthStore;