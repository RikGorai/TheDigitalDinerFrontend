import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function AddMenuItem() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null); // State for image file
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]); // State to store menu categories
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        // Fetch existing menu categories
        API.get('/menu')
            .then(res => {
                const uniqueCategories = [...new Set(res.data.map(item => item.category))];
                setCategories(uniqueCategories);
            })
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('category', category);
            if (imageFile) {
                formData.append('image', imageFile); // Append the image file
            }

            await API.post('/menu', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Menu item added successfully!');
            setName('');
            setPrice('');
            setDescription('');
            setImageFile(null);
            setCategory('');
        } catch (err) {
            alert('Failed to add menu item.');
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Menu Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Item Name"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                    required
                />
                <div className="relative">
                    <input
                        type="file"
                        onChange={(e) => setImageFile(e.target.files[0])} // Handle file input
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*" // Restrict to image files
                        required
                    />
                    <div className="w-full border p-2 rounded bg-gray-800 text-gray-300 text-center cursor-pointer hover:bg-gray-700">
                        {imageFile ? imageFile.name : 'Choose Image'}
                    </div>
                </div>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border p-2 rounded bg-gray-800 text-gray-300"
                    required
                >
                    <option value="" disabled className="text-gray-500">Select Category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat} className="text-gray-300 bg-gray-800">{cat}</option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
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
                            Adding...
                        </div>
                    ) : (
                        'Add Item'
                    )}
                </button>
            </form>
        </div>
    );
}
