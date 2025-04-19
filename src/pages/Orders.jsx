import { useEffect, useState } from 'react';
import API from '../api/axios';
import useAuthStore from '../store/authStore';

export default function Orders() {
    const { user, token } = useAuthStore();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        if (user?.phone && token) {
            setLoading(true); // Set loading to true before fetching
            API.get(`/orders/${user.phone}`)
                .then(res => {
                    const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by most recent
                    setOrders(sortedOrders);
                    setError(null); // Clear any previous errors
                })
                .catch(err => {
                    console.error('Error fetching orders:', err);
                    setError('Failed to fetch orders. Please try again later.');
                })
                .finally(() => setLoading(false)); // Set loading to false after fetching
        }
    }, []); // Remove dependencies to ensure API call on every refresh or revisit

    if (!token) {
        return <div className="p-4 text-center text-gray-400">Please log in to view your orders.</div>;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-400">
                Loading your orders...
            </div>
        );
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {orders.length === 0 ? (
                <p>No previous orders found.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order.id} className="border p-3 rounded shadow">
                            <p className="font-semibold">Order #{order.id}</p>
                            <ul className="text-sm list-disc list-inside">
                                {order.cart.map((item, i) => (
                                    <li key={i}>{item.name} x {item.quantity}</li>
                                ))}
                            </ul>
                            <p className="text-right text-sm mt-1 text-gray-500">
                                Placed on: {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
