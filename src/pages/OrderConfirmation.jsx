import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderData } = location.state || {}; // Retrieve order data from navigation state

    if (!orderData) {
        return (
            <div className="p-4 text-center text-gray-400">
                No order details available. <button onClick={() => navigate('/')} className="text-blue-500 underline">Go to Home</button>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-3xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Order Confirmation</h2>
            <div className="mb-6">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <p><strong>Name:</strong> {orderData.name}</p>
                <p><strong>Phone:</strong> {orderData.phone}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-semibold">Order Details</h3>
                <ul className="list-disc list-inside">
                    {orderData.cart.map((item, index) => (
                        <li key={index}>
                            {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="text-right font-bold text-lg">
                <p>Total: ₹{orderData.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
            </div>
            <button
                onClick={() => navigate('/')}
                className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Back to Home
            </button>
        </div>
    );
}
