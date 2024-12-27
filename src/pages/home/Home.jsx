import React from 'react';
import Header from './Header';
import Review from './Review';
import FoodDeliver from './FoodDeliver';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <FoodDeliver></FoodDeliver>
            <Review></Review>
            
        </div>
        
    );
};

export default Home;