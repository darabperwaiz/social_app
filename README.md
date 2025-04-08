# React Social Media App

![Screenshot 2025-04-06 105728](https://github.com/user-attachments/assets/c6861da8-e6c0-46b5-8cde-bad5903a5fcc)
 <!-- Add your screenshot later -->

A full-featured social media application built with React, featuring authentication, posts, comments, and likes with complete CRUD operations.

## ✨ Key Features

### 🔐 Authentication
- User login/logout functionality
- Protected routes
- Session persistence
- Profile management

### 📝 Posts
- Create, edit, and delete posts
- Image upload support
- Pagination (10 posts per page)
- Responsive design

### 💬 Interactions
- Like/unlike posts
- Nested comment system
- Reply to comments
- Real-time updates

### 👤 User Profiles
- View user information
- See all posts by a user
- Update profile picture
- Personalized feed

## 🛠️ Technologies Used

| Technology       | Purpose                          |
|------------------|----------------------------------|
| React 18         | Frontend framework               |
| React Router v6  | Navigation and routing           |
| Context API      | State management                 |
| LocalStorage     | Data persistence                 |
| CSS3             | Styling and animations           |
| JavaScript ES6+  | Application logic                |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-social-media-app.git
   cd react-social-media-app
Install dependencies:

```bash
npm install
```
Start the development server:

```bash
npm start
```
Open your browser and visit:
http://localhost:3000

📂 Project Structure
```bash
src/
├── components/       # Reusable components
│   ├── Auth/         # Authentication components
│   ├── Navbar/       # Navbar related components
│   ├── Pagination/   # Pagination components
│   └── Post/         # Post Related components
├── context/          # Context providers
│   ├── AuthContext.jsx # Authentication state
│   └── PostContext.jsx # Posts, Likes and comments state
├── pages/            # Page components
│   ├── Home.jsx      # Main feed
│   ├── Login.jsx     # Login page
│   ├── Profile.jsx   # User profile
│   └── NewPost.jsx   # Post creation
├── Hooks/            # Page components
│   ├── useAuth.jsx
│   └── usePosts.jsx  # Post creation
├── Layout.jsx 
├── App.jsx           # Main app component
└── index.js          # Entry point
```

📜 Available Scripts
Script	Description
npm start	Runs the app in development mode
npm test	Launches the test runner
npm run build	Builds the app for production
npm run eject	Ejects from Create React App config

🔒 Authentication Details
The app uses localStorage to persist user sessions. For testing, use these credentials:


🧩 Customization
To customize the app:

Update styles in the CSS files

Modify initial state in context files

Add new components as needed

🌟 Future Enhancements
Implement real backend API integration

Add user following/followers system

Introduce notifications

Improve accessibility (ARIA labels)

Add dark/light mode toggle

Implement post sharing feature

🤝 Contributing
Fork the project

Open a Pull Request
