# FeastFusion: A Food Ordering Platform

An online platform where food lovers can explore, order, and enjoy a wide range of delicious dishes. From starters to desserts, we cater to every taste, ensuring a delightful dining experience. Our platform features user authentication, food management, and an intuitive design for seamless browsing and ordering.

# Live Website Link

https://restaurant-management-eb040.web.app

# Features

### Navbar
1. Displays the website name and navigation links to different pages.
2. Includes conditional Login/Register buttons.
3. If the user is logged in:
     Displays their photoURL and displayName on hover.
     Includes a Log Out button.

### Login Page
1. Fields for email, password, and Google authentication methods.
2. Displays an error message using a toast or SweetAlert for incorrect credentials.

### Register Page

1. fields for Name, Email, PhotoUrl, Password
2. Password with validation.
3. Error ans Success Toast

### Home Page

1. A banner/slider with at least 3 slides showcasing restaurant highlights.
2. A Top Selling Foods section displaying the 6 most purchased items with "View Details" buttons.
3. Order step is shown.
4. rCustomer Review shown(static)

### Add Food Page (Private Route)

1. A form for adding new food items, including:
Image,Food Name,Category,Description,Price,Rating,Quantity,Purchase Count
2. User Email and Name are displayed as read-only fields.
3. After submitting, a success message is displayed.

### All Foods Page
1. Displays all food items in a card format with details such as:
Name, Image, Category,Price,Quantity
2. Includes a Search Bar for filtering foods by name.
3. Each food card has a "View Details" button that redirects to the Single Food Page.

### Single Food Page (Private Route)
1. Displays detailed information about a food item.
2. Includes a Purchase button for ordering the food item.

### My Foods Page (Private Route)
1. Displays all food items added by the logged-in user in a card format.
2. Includes options to Update food details.

### Update Food Page (Private Route)
1. A form for updating food details, with User Email and Name as read-only fields.
2. After a successful update, a confirmation message is displayed.

### Footer

Website name
Copyright information
Contact details
Social media links

## Technologies Used

### Frontend

React
React Router
React Icons
CSS
Tailwind CSS
DaisyUI

### Backend
Firebase Authentication
Firebase Realtime Database
MongoDB 
### Data Management
Firebase Authentication
Firebase Database for storing user and food information

## Packages
React Awesome Reveal: For smooth animations.
React Tooltip: For providing additional information on hover.
SweetAlert: For interactive alerts and messages.