# Portfolio: Gurusewak Singh - Full Stack Developer

This repository contains the source code for my personal portfolio website, built with the MERN stack (MongoDB, Express, React, Node.js) and deployed on Vercel.

## Tech Stack

-   **Frontend:** React, Vite, Tailwind CSS, Framer Motion
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB
-   **Deployment:** Vercel

## Features

-   **Dynamic Content:** Projects and testimonials are managed via a custom admin panel.
-   **Admin Dashboard:** A secure admin area to perform CRUD operations on portfolio content.
-   **Responsive Design:** Fully responsive layout for all devices.
-   **Contact Form:** Integrated with Nodemailer to forward messages directly to my email.

## Getting Started

### Prerequisites

-   Node.js (v18 or newer)
-   MongoDB Atlas account (or local instance)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gurusewak-singh/gurusewak-singh-my-portfolio.git
    cd gurusewak-singh-my-portfolio
    ```

2.  **Setup Backend (`/server`):**
    ```bash
    cd server
    npm install
    ```
    -   Create a `.env` file in the `/server` directory and add the following variables:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        PORT=5000
        CONTACT_EMAIL=your_gmail_address
        CONTACT_PASSWORD=your_gmail_app_password
        ```
    -   Run the backend server: `npm start`

3.  **Setup Frontend (`/Guru Portfolio`):**
    ```bash
    cd ../"Guru Portfolio"
    npm install
    ```
    -   Create a `.env.local` file in the `/Guru Portfolio` directory and add the following:
        ```env
        VITE_API_URL=http://localhost:5000
        ```
    -   Run the frontend dev server: `npm run dev`

The application should now be running on `http://localhost:5173`.