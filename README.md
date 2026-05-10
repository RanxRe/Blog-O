# Blog-O 🚀

## Website URL - https://blog-o.onrender.com

A modern full-stack blog application built using the MERN stack with authentication, blog management, categories, comments, likes, dark mode, responsive UI, and secure backend practices.

---

## 🌟 Features

### 🔐 Authentication

* User Signup & Sign In
* JWT Authentication
* Secure HTTP-only Cookies
* Google Login Integration

### 📝 Blog Features

* Create Blogs
* Update Blogs
* Delete Blogs
* Rich Text Editor (CKEditor 5)
* Blog Categories
* Blog Search
* Blog Likes
* Blog Comments

### 👤 User Features

* User Dashboard
* Profile Management
* Persistent Login using Redux Persist

### 🎨 UI Features

* Fully Responsive Design
* Dark / Light Theme
* Modern UI using Shadcn UI
* Tailwind CSS v4
* Mobile Sidebar Navigation

### ⚡ Backend Features

* Express REST API
* MongoDB with Mongoose
* Rate Limiting
* Helmet Security
* Compression Middleware
* Centralized Error Handling

---

# 🛠 Tech Stack

## Frontend

* React 19
* Vite
* Tailwind CSS v4
* Shadcn UI
* Redux Toolkit
* React Hook Form
* Zod Validation
* React Router v7
* Firebase Authentication

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* BcryptJS
* Express Rate Limit
* Helmet
* Compression

---

# 📂 Project Structure

```bash
.
|-- client
|   |-- README.md
|   |-- components.json
|   |-- eslint.config.js
|   |-- index.html
|   |-- jsconfig.json
|   |-- package-lock.json
|   |-- package.json
|   |-- public
|   |   `-- favicon.ico
|   |-- src
|   |   |-- App.jsx
|   |   |-- Layout
|   |   |   `-- Layout.jsx
|   |   |-- assets
|   |   |   |-- images
|   |   |   |   |-- brand-logo-dark.png
|   |   |   |   |-- brand-logo-dark1.png
|   |   |   |   |-- brand-logo-light.png
|   |   |   |   |-- favicon-16x16.png
|   |   |   |   |-- favicon-32x32.png
|   |   |   |   |-- loading.svg
|   |   |   |   `-- user.png
|   |   |   `-- react.svg
|   |   |-- components
|   |   |   |-- AppSidebar.jsx
|   |   |   |-- AuthRouteProtection.jsx
|   |   |   |-- AuthRouteProtectionAdmin.jsx
|   |   |   |-- BlogCard.jsx
|   |   |   |-- CommentCount.jsx
|   |   |   |-- CommentList.jsx
|   |   |   |-- Comments.jsx
|   |   |   |-- Editor.jsx
|   |   |   |-- EmptyState.jsx
|   |   |   |-- Footer.jsx
|   |   |   |-- GoogleLogin.jsx
|   |   |   |-- LikeCount.jsx
|   |   |   |-- Loading.jsx
|   |   |   |-- RelatedBlogs.jsx
|   |   |   |-- SearchBox.jsx
|   |   |   |-- Sidebar.jsx
|   |   |   |-- SidebarLink.jsx
|   |   |   |-- Topbar.jsx
|   |   |   |-- UserDropDownMenu.jsx
|   |   |   |-- theme-provider.jsx
|   |   |   `-- ui
|   |   |       |-- avatar.jsx
|   |   |       |-- badge.jsx
|   |   |       |-- button.jsx
|   |   |       |-- card.jsx
|   |   |       |-- dropdown-menu.jsx
|   |   |       |-- field.jsx
|   |   |       |-- input.jsx
|   |   |       |-- label.jsx
|   |   |       |-- select.jsx
|   |   |       |-- separator.jsx
|   |   |       |-- sheet.jsx
|   |   |       |-- sidebar.jsx
|   |   |       |-- skeleton.jsx
|   |   |       |-- spinner.jsx
|   |   |       |-- table.jsx
|   |   |       |-- textarea.jsx
|   |   |       `-- tooltip.jsx
|   |   |-- helpers
|   |   |   |-- firebase.js
|   |   |   |-- getEnvName.js
|   |   |   |-- routeName.js
|   |   |   `-- showToast.js
|   |   |-- hooks
|   |   |   |-- use-mobile.js
|   |   |   `-- useFetch.js
|   |   |-- index.css
|   |   |-- lib
|   |   |   `-- utils.js
|   |   |-- main.jsx
|   |   |-- pages
|   |   |   |-- Comments.jsx
|   |   |   |-- Error.jsx
|   |   |   |-- Index.jsx
|   |   |   |-- Profile.jsx
|   |   |   |-- SearchResult.jsx
|   |   |   |-- SignIn.jsx
|   |   |   |-- SignUp.jsx
|   |   |   |-- Users.jsx
|   |   |   |-- blog
|   |   |   |   |-- AddBlog.jsx
|   |   |   |   |-- BlogByCategory.jsx
|   |   |   |   |-- BlogDetailSingle.jsx
|   |   |   |   |-- BlogDetails.jsx
|   |   |   |   |-- BlogsTable.jsx
|   |   |   |   `-- EditBlog.jsx
|   |   |   `-- categories
|   |   |       |-- AddCategories.jsx
|   |   |       |-- CategoriesDetails.jsx
|   |   |       |-- CategoryTable.jsx
|   |   |       `-- EditCategories.jsx
|   |   |-- redux
|   |   |   `-- user
|   |   |       `-- user.slice.js
|   |   `-- store
|   |       `-- store.js
|   `-- vite.config.js
|-- server
|   |-- package-lock.json
|   |-- package.json
|   |-- server.js
|   `-- src
|       |-- app.js
|       |-- config
|       |   `-- db.js
|       |-- controllers
|       |   |-- auth.controller.js
|       |   |-- blog.controller.js
|       |   |-- blogLike.controller.js
|       |   |-- category.controller.js
|       |   |-- comment.controller.js
|       |   `-- user.controller.js
|       |-- helpers
|       |   `-- handleError.js
|       |-- lib
|       |   |-- cloudinary.js
|       |   |-- env.js
|       |   `-- multer.js
|       |-- middlewares
|       |   |-- auth.admin.middleware.js
|       |   |-- auth.middleware.js
|       |   |-- errorMiddleware.js
|       |   `-- rateLimit.middleware.js
|       |-- models
|       |   |-- blog.model.js
|       |   |-- category.model.js
|       |   |-- comment.model.js
|       |   |-- like.model.js
|       |   `-- user.model.js
|       `-- routes
|           |-- auth.routes.js
|           |-- blog.routes.js
|           |-- category.routes.js
|           |-- comment.routes.js
|           |-- like.routes.js
|           `-- user.routes.js
`-- structure.txt

26 directories, 116 files

```
# Ignore structure.txt( just a file for saving tree structure of my project's folder & files)

---

# ⚙️ Environment Variables

## Client `.env`

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Server `.env`

```env
PORT=8080
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# 🚀 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/blog-o.git
cd blog-o
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# ▶️ Running The Project

## Start Backend

```bash
cd server
npm run dev
```

---

## Start Frontend

```bash
cd client
npm run dev
```

---

# 🔒 Security Features

* Helmet for secure HTTP headers
* Express Rate Limiting
* Password Hashing with BcryptJS
* JWT Authentication
* Protected Routes
* HTTP-only Cookies

---

# 📱 Responsive Design

The application is fully optimized for:

* Mobile Devices
* Tablets
* Desktop Screens

---

# 🌙 Dark Mode

Built-in dark/light theme toggle using:

* Tailwind CSS
* Custom Theme Provider
* Shadcn UI

---

# 📦 Deployment

This project can be deployed on:

* Render
* Vercel
* Netlify
* Railway

---

# 👨‍💻 Author

### Ranjeet Kumar Mahato

Built with ❤️ using the MERN Stack.

---

# 📄 License

This project is licensed under the MIT License.
