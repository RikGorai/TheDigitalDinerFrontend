import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

export default function FooterCart() {
    const { items, total } = useCartStore();
    const navigate = useNavigate();

    if (items.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
            <div>{items.length} item(s) | ₹{total()}</div>
            <button
                onClick={() => navigate('/cart')}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
                View Cart
            </button>
        </div>
    );
}