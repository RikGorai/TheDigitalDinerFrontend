import { useEffect, useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openCategory, setOpenCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/menu')
            .then(res => {
                setMenuItems(res.data);
                const cats = [...new Set(res.data.map(item => item.category))];
                setCategories(cats);
            })
            .catch(err => console.error('Error loading menu:', err));
    }, []);

    return (
        <div className="p-4 max-w-4xl mx-auto text-gray-300 pt-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Menu</h2>
            {categories.map(category => (
                <div key={category} className="mb-4">
                    <button
                        className="w-full text-left text-xl font-semibold bg-gray-800 p-2 rounded hover:bg-gray-700"
                        onClick={() => setOpenCategory(openCategory === category ? null : category)}
                    >
                        {category}
                    </button>
                    <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${openCategory === category ? 'max-h-[1000px]' : 'max-h-0'}`}
                    >
                        <ul className="space-y-2 p-2">
                            {menuItems
                                .filter(item => item.category === category)
                                .map(item => (
                                    <li
                                        key={item._id}
                                        onClick={() => navigate(`/item/${item._id}`)}
                                        className="cursor-pointer hover:bg-gray-600 p-2 border rounded flex justify-between"
                                    >
                                        <span>{item.name}</span>
                                        <span>₹{item.price}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}
