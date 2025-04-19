import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import useCartStore from '../store/cartStore';

export default function ItemDetail() {
    const { id } = useParams();
    const { addToCart } = useCartStore();
    const [item, setItem] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        API.get(`/menu/${id}`).then(res => setItem(res.data));
    }, [id]);

    if (!item) return <div className="p-4 text-center text-gray-400">Loading item...</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="p-6 max-w-3xl min-w-[300px] bg-gray-800 rounded-lg shadow-lg">
                <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover rounded-lg mb-6" />
                <h2 className="text-3xl font-bold text-center mb-2">{item.name}</h2>
                <p className="text-gray-400 text-center mb-4">{item.description}</p>
                <p className="text-xl font-semibold text-center mb-6">₹{item.price}</p>

                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                        className="px-4 py-2 border border-gray-300 rounded-full text-gray-300 bg-transparent hover:bg-gray-300 hover:text-black transition-all"
                    >
                        -
                    </button>
                    <span className="text-lg font-semibold">{qty}</span>
                    <button
                        onClick={() => setQty(qty + 1)}
                        className="px-4 py-2 border border-gray-300 rounded-full text-gray-300 bg-transparent hover:bg-gray-300 hover:text-black transition-all"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={() => {
                        for (let i = 0; i < qty; i++) addToCart(item);
                    }}
                    className="mt-6 w-full px-4 py-2 border border-green-400 rounded-full text-green-400 hover:bg-green-400 hover:text-white transition-all"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}