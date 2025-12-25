# CodeLeap Network – Frontend Challenge

This project is a solution for the **CodeLeap Frontend Challenge**.  
It is a React application that allows users to create, edit and interact with posts in a social feed.

---

## 🚀 Tech Stack

- **React** (Vite)
- **Ant Design** (UI components)
- **Styled-components** (custom styling)
- **Zustand** (state management)
- **Firebase Authentication** (Google Sign-In)
- **LocalStorage** (persistent frontend interactions)

---

## ✨ Features

### 🔐 Authentication
- Manual username login (challenge requirement)
- Google Sign-In using Firebase
- Persistent session using Zustand + localStorage
- Protected routes for authenticated users

### 📝 Posts
- Create new posts
- Edit existing posts (owner only)
- Delete posts (owner only)
- Fetch posts from CodeLeap API

### ❤️ Likes
- Like / unlike posts
- Prevent multiple likes from the same user
- Likes persist across page reloads using localStorage

### 💬 Comments
- Add comments to posts
- View comments in a modal
- Comments persist across page reloads using localStorage

### 🔍 Search & Filtering
- Real-time search by:
  - Post title
  - Post content
  - Username
- Pagination resets automatically when filtering

### 📄 Pagination & Infinite Scroll
- Client-side pagination
- Infinite scroll using `IntersectionObserver`
- "Load more" behavior without page reloads

### ⏳ Loading States
- Skeleton loaders while fetching posts
- Spinner for infinite scroll loading

### 🎨 UI & UX Enhancements
- Styled-components for custom theming
- Hover effects and button animations
- Smooth UX interactions

---

## 🧠 Architecture & Decisions

### State Management
- **Zustand** is used for global state management
- Separate stores for:
  - Authentication
  - Posts & interactions

### Data Normalization
Posts fetched from the API are normalized to ensure:
- `likes`
- `likedBy`
- `comments`
always exist, preventing runtime errors.

### Persistent Interactions
Since the API does not support likes or comments:
- Likes and comments are stored in `localStorage`
- Merged with API data on fetch
- Simulates realistic backend behavior

---

## 🧪 Extra Features Implemented

✔ Likes  
✔ Comments  
✔ Google Authentication  
✔ Persistent login  
✔ Infinite scroll  
✔ Search & filtering  
✔ Skeleton loaders  
✔ UI animations  

---

## 🛠️ Setup & Run Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
