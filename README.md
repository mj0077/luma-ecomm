# Simple Shop Proto

# Simple E-Commerce Web App — Development Prompt

Create a **simple, clean, modern e-commerce-style web application** with a minimal scope. This is primarily a demonstration/prototype application, so **do not over-engineer the backend or introduce unnecessary features**.

The application should have only **3 main pages**:

1. Login
2. Products
3. Cart

The goal is to demonstrate a basic authentication flow, product listing, adding products to a cart, and calculating the cart total.

---

## 1. Overall Requirements

Build the application as a small, polished web app with:

* A simple login system
* 3–4 hard-coded users
* A products page containing approximately 8–10 products
* An **Add to Cart** button for every product
* A cart page showing products added by the logged-in user
* Automatic calculation of the total cart value
* Basic navigation between Products and Cart
* Logout functionality
* No payment gateway
* No checkout process
* No real database
* No complex user-management system
* No product-management dashboard
* No unnecessarily complex backend

The application should feel like a **real but intentionally lightweight e-commerce prototype**.

---

# 2. Authentication / Login Page

Create a clean login page as the first page of the application.

### UI

The login page should contain:

* Application logo/name at the top
* "Welcome Back" heading
* Short subtitle such as "Sign in to continue"
* Username/email input
* Password input
* Login button
* Error message area for invalid credentials

Keep the design minimal and professional.

### Authentication Logic

For demonstration purposes, use **3–4 hard-coded users** in the backend.

Example:

```text
User 1
Email: john@example.com
Password: password123

User 2
Email: jane@example.com
Password: password456

User 3
Email: admin@example.com
Password: admin123

User 4
Email: demo@example.com
Password: demo123
```

These credentials should exist in a simple hard-coded data structure.

When the user submits the login form:

1. Validate that both fields are populated.
2. Check the entered credentials against the hard-coded users.
3. If the credentials are correct:

   * Authenticate the user.
   * Store a simple session/authentication state.
   * Redirect the user to the Products page.
4. If credentials are incorrect:

   * Remain on the login page.
   * Display a clear error such as:
     **"Invalid email or password."**

Do not implement a complicated authentication architecture.

For this prototype, a simple session/local storage/token-based approach is sufficient.

### Route Protection

The Products and Cart pages should not be accessible when the user is not logged in.

If an unauthenticated user attempts to access either page directly, redirect them back to the Login page.

---

# 3. Products Page

After successful login, take the user to the Products page.

This is the primary page of the application.

### Header / Navigation

Create a simple navigation header containing:

* Application logo/name
* "Products" navigation item
* "Cart" navigation item
* Cart item count/badge
* Logged-in user's name/email
* Logout button

Example:

```text
----------------------------------------------------
 MyStore        Products       Cart (3)      John ▼
----------------------------------------------------
```

The cart badge should update whenever a product is added.

---

## Product Listing

Display approximately **8–10 products**.

Use hard-coded product data.

Each product should contain:

* Product ID
* Product name
* Product image
* Short description
* Price
* Add to Cart button

Example products:

1. Wireless Headphones — $79.99
2. Mechanical Keyboard — $99.99
3. Smart Watch — $149.99
4. Wireless Mouse — $39.99
5. USB-C Hub — $49.99
6. Portable Speaker — $69.99
7. Gaming Controller — $59.99
8. Laptop Stand — $44.99
9. Power Bank — $34.99
10. Bluetooth Earbuds — $89.99

You may use appropriate placeholder/product images.

---

## Product Card Design

Each product should appear as a clean card.

Example structure:

```text
┌──────────────────────────┐
│                          │
│      Product Image       │
│                          │
├──────────────────────────┤
│ Wireless Headphones      │
│ Premium wireless audio   │
│                          │
│ $79.99                   │
│                          │
│ [     Add to Cart     ]  │
└──────────────────────────┘
```

Use a responsive grid.

Desktop:

* 4 products per row where appropriate

Tablet:

* 2–3 products per row

Mobile:

* 1 product per row

---

# 4. Add to Cart Functionality

The **Add to Cart button is an important requirement**.

When a user clicks "Add to Cart":

1. Add that product to the cart.
2. Update the cart count in the navigation.
3. Provide some visual feedback that the product was added.

For example:

* Change button text temporarily to "Added!"
* Or show a small toast notification:
  **"Wireless Headphones added to cart."**

The same product may either:

* Increase its quantity if already in the cart, OR
* Remain as one cart item.

Prefer the first approach because it makes the cart functionality feel more realistic.

---

# 5. Cart Page

Create a dedicated Cart page.

The Cart page should display every product that the user has added.

Example:

```text
My Cart

---------------------------------------------------------
Product              Price        Qty       Subtotal
---------------------------------------------------------
Wireless Headphones  $79.99        2        $159.98
USB-C Hub            $49.99        1         $49.99
Gaming Controller    $59.99        1         $59.99
---------------------------------------------------------

                              Total: $269.96

[ Continue Shopping ]
```

---

## Cart Functionality

Each cart item should display:

* Product image
* Product name
* Unit price
* Quantity
* Subtotal

Provide basic quantity controls:

```text
[-] 2 [+]
```

The user should be able to:

* Increase quantity
* Decrease quantity
* Remove an item

When quantity changes, update the subtotal and total automatically.

---

# 6. Cart Total

Calculate the total dynamically.

For every cart item:

```text
subtotal = product price × quantity
```

Then:

```text
cart total = sum of all item subtotals
```

Display the final total prominently.

Example:

```text
Subtotal: $269.96
Total:    $269.96
```

Do not implement taxes, shipping, discounts, coupons, or payment processing unless they are extremely easy to add.

Keep the calculation simple.

---

# 7. Empty Cart State

If there are no products in the cart, do not show an empty table.

Instead, display a simple empty state:

```text
Your cart is empty.

Looks like you haven't added anything yet.

[ Browse Products ]
```

The button should take the user back to the Products page.

---

# 8. Logout

Add a Logout button to the navigation/header.

When clicked:

1. Clear the authentication/session state.
2. Clear or appropriately reset the cart state.
3. Redirect the user to the Login page.

After logout, the user should not be able to access Products or Cart through browser navigation.

---

# 9. Data Structure

Keep the data simple and hard-coded.

Example product structure:

```javascript
{
  id: 1,
  name: "Wireless Headphones",
  description: "Premium wireless headphones",
  price: 79.99,
  image: "/images/headphones.jpg"
}
```

Example user structure:

```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  password: "password123"
}
```

Do not create a database.

Do not create CRUD APIs for products or users.

Do not create an admin panel.

The purpose is simply to demonstrate the frontend flow and basic backend authentication.

---

# 10. Backend

Create only the minimum backend necessary to demonstrate the login functionality.

The backend should contain the hard-coded users and provide a simple login/authentication endpoint if the selected architecture uses an API.

For example:

```text
POST /api/login
```

Request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Successful response can contain basic user/session information.

There is no need for:

* Database integration
* User registration
* Password reset
* Email verification
* OAuth
* Social login
* Roles/permissions
* Admin authentication
* Production-grade identity management

This is a prototype/demo application.

---

# 11. State Management

Keep state management simple.

The application needs to maintain:

### Authentication state

```text
isAuthenticated
currentUser
```

### Cart state

```text
cartItems
quantity
```

The cart should remain available while navigating between Products and Cart.

For a simple prototype, use the framework's built-in state management or a lightweight solution.

Avoid introducing Redux or another large state-management library unless it is already part of the chosen project structure.

---

# 12. Visual Design

The application should look **modern, clean, minimal, and professional**.

Use:

* Lots of whitespace
* Rounded cards
* Subtle borders/shadows
* Clear typography
* Consistent spacing
* Simple navigation
* Modern buttons
* Responsive layout
* Subtle hover states
* Loading/feedback states where appropriate

Avoid making it overly complicated.

The design should resemble a modern SaaS/e-commerce prototype rather than a large commercial shopping website.

---

# 13. Responsive Design

The application must work well on:

* Desktop
* Laptop
* Tablet
* Mobile

The product grid should automatically adapt to the screen size.

The navigation should also become mobile-friendly on smaller screens.

---

# 14. User Flow

The complete expected flow is:

```text
                 ┌───────────────┐
                 │   Login Page  │
                 └───────┬───────┘
                         │
                   Valid Login
                         │
                         ▼
                 ┌───────────────┐
                 │ Products Page │
                 └───────┬───────┘
                         │
                    Add to Cart
                         │
                         ▼
                 ┌───────────────┐
                 │   Cart Page   │
                 └───────┬───────┘
                         │
                   Continue Shopping
                         │
                         ▼
                 ┌───────────────┐
                 │ Products Page │
                 └───────────────┘
```

Logout from any authenticated page should return the user to:

```text
Login Page
```

---

# 15. Important Scope Restrictions

**Do NOT overbuild this application.**

This is intentionally a small demonstration project.

Do NOT add:

* Real payment processing
* Stripe
* PayPal
* Database
* Product search backend
* Product filtering backend
* Product reviews
* Wishlist
* Order history
* Checkout
* Shipping system
* Coupons
* Notifications system
* Complex authentication
* Registration
* Forgot password
* Email verification
* Admin dashboard
* Microservices
* Unnecessary APIs

Only implement what is required for the 3-page flow.

---

# 16. Code Quality

Even though this is a small application:

* Keep components modular.
* Use reusable ProductCard and CartItem components.
* Keep product/user data separate from UI components.
* Use meaningful variable and component names.
* Keep authentication logic separate from presentation.
* Avoid duplicated code.
* Add basic validation.
* Handle empty states.
* Handle invalid login attempts.
* Handle cart quantity updates correctly.
* Make the UI responsive.

---

# 17. Final Acceptance Criteria

The application is considered complete when all of the following work:

### Login

* [ ] Login page loads first.
* [ ] At least 3 hard-coded users exist.
* [ ] Correct credentials successfully log the user in.
* [ ] Incorrect credentials display an error.
* [ ] Empty fields are validated.
* [ ] Authenticated users are redirected to Products.
* [ ] Unauthenticated users cannot access Products or Cart.

### Products

* [ ] 8–10 products are displayed.
* [ ] Every product has an image, name, description, and price.
* [ ] Every product has an **Add to Cart** button.
* [ ] Clicking Add to Cart actually adds the product.
* [ ] Cart count updates.
* [ ] User receives visual feedback after adding an item.

### Cart

* [ ] Added products appear in the Cart.
* [ ] Product quantity is displayed.
* [ ] Quantity can be increased/decreased.
* [ ] Products can be removed.
* [ ] Subtotals update dynamically.
* [ ] Overall total updates dynamically.
* [ ] Empty-cart state is displayed when appropriate.
* [ ] Continue Shopping navigates back to Products.

### Navigation

* [ ] Products → Cart works.
* [ ] Cart → Products works.
* [ ] Logout works.
* [ ] Browser refresh does not incorrectly bypass authentication.

---

## Final Instruction

Build the application **as a polished, functional prototype rather than a production-scale e-commerce platform**.

Prioritize:

**Simplicity → Clean UI → Correct login flow → Working Add to Cart → Working Cart calculations → Responsive design.**

Do not add features that are not required above. If a technical decision is ambiguous, choose the **simplest implementation that satisfies the requirements**.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://light-shop-kit.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e95a2cd8-9e1d-4bbf-a77e-fa106ead226e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
