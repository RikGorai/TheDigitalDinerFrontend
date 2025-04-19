import { useState } from 'react';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, total, clearCart } = useCartStore();
    const { token, user } = useAuthStore(); // Access user details
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Add loading state

    const handleOrder = async () => {
        if (!token) return navigate('/login');
        setLoading(true); // Set loading to true before placing the order
        try {
            const orderData = {
                name: user?.name || 'Customer', // Use the current user's name
                phone: user?.phone || '0000000000', // Use the current user's phone number
                cart: items
            };
            await API.post('/orders', orderData);
            clearCart();
            navigate('/order-confirmation', { state: { orderData } }); // Navigate to OrderConfirmation page
        } catch (err) {
            alert('Failed to place order.');
        } finally {
            setLoading(false); // Set loading to false after the order is placed
        }
    };

    return (
        <div className="px-4 py-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {items.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                <div className="space-y-4">
                    {items.map(item => (
                        <div key={item._id} className="flex justify-between items-center border-b pb-2">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm">₹{item.price} x {item.quantity}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <button
                                    onClick={() => updateQuantity(item._id, item.quantity > 1 ? item.quantity - 1 : 1)}
                                    className="px-4 py-2 border border-gray-300 rounded-full text-gray-300 bg-transparent hover:bg-gray-300 hover:text-black transition-all"
                                >
                                    -
                                </button>
                                <span className="text-lg font-semibold">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                    className="px-4 py-2 border border-gray-300 rounded-full text-gray-300 bg-transparent hover:bg-gray-300 hover:text-black transition-all"
                                >
                                    +
                                </button>
                                <button onClick={() => removeFromCart(item._id)} className="text-red-600">Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="text-right font-bold text-lg">Total: ₹{total()}</div>
                    <button
                        onClick={handleOrder}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
                                Placing Order...
                            </div>
                        ) : (
                            'Order Now'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
