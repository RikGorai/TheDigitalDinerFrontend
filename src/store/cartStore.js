import { create } from 'zustand';

const useCartStore = create((set, get) => ({
    items: JSON.parse(localStorage.getItem('cartItems')) || [], // Load cart items from local storage
    addToCart: (item) => {
        const items = get().items;
        const existing = items.find(i => i._id === item._id);
        if (existing) {
            existing.quantity += 1;
            const updatedItems = [...items];
            set({ items: updatedItems });
            localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Save to local storage
        } else {
            const updatedItems = [...items, { ...item, quantity: 1 }];
            set({ items: updatedItems });
            localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Save to local storage
        }
    },
    removeFromCart: (id) => {
        const updatedItems = get().items.filter(i => i._id !== id);
        set({ items: updatedItems });
        localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Save to local storage
    },
    updateQuantity: (id, qty) => {
        const updated = get().items.map(i =>
            i._id === id ? { ...i, quantity: qty } : i
        );
        set({ items: updated });
        localStorage.setItem('cartItems', JSON.stringify(updated)); // Save to local storage
    },
    clearCart: () => {
        set({ items: [] });
        localStorage.removeItem('cartItems'); // Clear local storage
    },
    total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));

export default useCartStore;
