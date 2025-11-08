# SwiftCart 🚀

An Ecommerce Website

[![CSS](https://img.shields.io/badge/CSS-brightgreen)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-yellow)](https://www.javascript.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-blue)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-red)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-green)](https://nodejs.org/)

## Description 📝

SwiftCart is a simple e-commerce website built using HTML, CSS, and JavaScript with Tailwind CSS for styling. It features a product carousel, product listings with category filtering, and a shopping cart with checkout functionality. The backend is built with Node.js and Express, and uses Stripe for payment processing.

## Table of Contents 📚

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Important Links](#important-links)
- [Footer](#footer)

## Features ✨

- **Product Carousel:** A rotating carousel showcasing featured products on the homepage. 🔄
- **Product Listings:** Display of available products with images, descriptions, and prices. 🏷️
- **Category Filtering:** Products can be filtered by category (Electronics, Fashion, Home Goods, Sports and Outdoors). 🔍
- **Shopping Cart:** A cart that allows users to add, remove, and modify quantities of products. 🛒
- **Checkout:** Integration with Stripe for processing payments. 💳
- **Mobile-Responsive Design:** The website is designed to be responsive and work on different screen sizes. 📱
- **Search Functionality:** Implemented search functionality allowing users to search products by name.

## Tech Stack 💻

- **Frontend:**
  - HTML
  - CSS
  - JavaScript
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express
- **Payment Processing:**
  - Stripe

## Installation 🛠️

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/davedevcodes/SwiftCart.git
    cd SwiftCart
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    - Create a `.env` file in the root directory.
    - Add your Stripe secret key:

      ```
      STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
      ```

4.  **Run Tailwind CSS CLI:**

   ```bash
   npx @tailwindcss/cli -i ./src/input.css -o ./public/output.css --watch
   ```

## Usage 🚀

1.  **Start the server:**

    ```bash
    npm start
    ```

2.  **Open the website in your browser:**

    Navigate to `http://localhost:3000`.

**Use Cases:**

This e-commerce template is perfect for:

- **Small Businesses:** Quickly set up an online store to sell products.
- **Educational Purposes:** A great learning resource for web development.
- **Personal Projects:** Customize and expand upon the template for unique e-commerce ventures.

### How to Use

- **Browsing Products:** Use the product listings and category filters to find items.
- **Adding to Cart:** Click "Add to cart" to add products to your shopping cart.
- **Viewing Cart:** Click the cart icon in the header to view and manage your cart.
- **Checkout:** Proceed to checkout from the cart to process payments via Stripe.

## Project Structure 📂

```
SwiftCart/
├── public/
│   ├── index.html         # Main HTML file
│   ├── product.html       # HTML file for product details
│   ├── cancel.html        # Cancel payment page
│   ├── success.html       # Success payment page
│   ├── js/
│   │   ├── app.js         # Carousel functionality
│   │   ├── main.js        # Main application logic
│   │   └── product.js     # Product details page logic
│   ├── output.css       # Tailwind CSS output file
│   └── products.json      # JSON file with product data
├── src/
│   └── input.css          # Tailwind CSS input file
├── tailwind.config.js   # Tailwind CSS configuration
├── package.json         # Node.js dependencies and scripts
└── server.js            # Node.js server file
```

## API Reference ℹ️

- `/products`: Returns the `products.json` file.
- `/create-checkout-session`: Creates a Stripe checkout session.

  - **Method:** POST
  - **Headers:** `Content-Type: application/json`
  - **Body:**

    ```json
    {
      "cartItems": [
        {
          "title": "Product Title",
          "price": 20.00,
          "qty": 2
        }
      ]
    }
    ```

  - **Response:**

    ```json
    {
      "url": "https://checkout.stripe.com/…"
    }
    ```

## Contributing 🤝

Contributions are welcome! Here are the steps to contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push to your fork.
5.  Submit a pull request.

## License 📜

This project has no specified license.

## Important Links 🔗

- **Repository:** [https://github.com/davedevcodes/SwiftCart](https://github.com/davedevcodes/SwiftCart)

## Footer 📝

- Repository Name: SwiftCart
- Repository URL: [https://github.com/davedevcodes/SwiftCart](https://github.com/davedevcodes/SwiftCart)
- Author: [davedevcodes](https://github.com/davedevcodes)

If you find this project helpful, please consider:

- ⭐ Starring the repository
- 🍴 Forking the repository to contribute
- 🐞 Reporting issues or suggesting enhancements
- ✉️ Contact: davedevcodes@example.com


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**