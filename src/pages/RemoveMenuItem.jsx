import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function RemoveMenuItem() {
    const [menuItems, setMenuItems] = useState([]);
    const [removingItemId, setRemovingItemId] = useState(null); // Track the ID of the item being removed
    const [fetching, setFetching] = useState(true); // Loading state for fetching items

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        setFetching(true);
        try {
            const res = await API.get('/menu');
            setMenuItems(res.data);
        } catch (err) {
            console.error('Error fetching menu items:', err);
        } finally {
            setFetching(false);
        }
    };

    const handleRemove = async (id) => {
        setRemovingItemId(id); // Set the ID of the item being removed
        try {
            await API.delete(`/menu/${id}`);
            alert('Menu item removed successfully!');
            setMenuItems(menuItems.filter(item => item._id !== id)); // Update the list after removal
        } catch (err) {
            alert('Failed to remove menu item.');
        } finally {
            setRemovingItemId(null); // Clear the removing state
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-400">
                Loading menu items...
            </div>
        );
    }

    return (
        <div className="p-4 max-w-4xl mx-auto text-gray-300">
            <h2 className="text-3xl font-bold mb-6 text-center">Remove Menu Items</h2>
            {menuItems.length === 0 ? (
                <p className="text-center">No menu items found.</p>
            ) : (
                <ul className="space-y-4">
                    {menuItems.map(item => (
                        <li key={item._id} className="flex justify-between items-center border p-3 rounded bg-gray-800">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-400">₹{item.price}</p>
                            </div>
                            <button
                                onClick={() => handleRemove(item._id)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                disabled={removingItemId === item._id} // Disable only the button for the item being removed
                            >
                                {removingItemId === item._id ? 'Removing...' : 'Remove'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
