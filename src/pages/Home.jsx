import { useRef } from 'react';
import bgImg from '../assets/restaurant-bg.jpg'; // Ensure this path is correct
import Menu from './Menu';

export default function Home() {
    const menuRef = useRef(null);

    const scrollToMenu = () => {
        menuRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div
                className="relative min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImg})` }} // Ensure the image URL is applied correctly
            >
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white px-4">
                    <h1 className="text-6xl font-bold font-serif mb-6">The Digital Diner</h1>
                    <p className="text-2xl italic mb-4">Savor the taste of tradition</p>
                    <p className="text-lg mb-2">Open Daily: 11 AM - 10 PM</p>
                    <p className="text-sm mb-8">123 Main Street, Food City</p>
                    <button
                        onClick={scrollToMenu}
                        className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full text-lg font-semibold shadow-lg transition-all"
                    >
                        View Menu
                    </button>
                </div>
            </div>
            <div ref={menuRef}>
                <Menu />
            </div>
        </div>
    );
}