import React, { useEffect, useState } from 'react';
import Header from './Header';
import Review from './Review';
import FoodDeliver from './FoodDeliver';
import TopSellingFoods from '../../router/TopSellingFood';

const Home = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkTheme(savedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        const rootElement = document.documentElement;
        if (isDarkTheme) {
            rootElement.classList.add('dark');
        } else {
            rootElement.classList.remove('dark');
        }
    }, [isDarkTheme]);

    const toggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            {/* Theme Toggle Button */}
            <div className="flex justify-center py-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                    {isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
            </div>

            {/* Page Content */}
            <Header  />
            <TopSellingFoods />
            <FoodDeliver />
            <Review />
        </div>
    );
};

export default Home;
