```markdown
# Netflix Clone - MERN Stack

A full-stack Netflix clone with React, Node.js, Express, MongoDB. Features user auth, movie browsing, search, categories, and video streaming.

![MERN Stack](https://img.shields.io/badge/MERN-FullStack-green)
![React](https://img.shields.io/badge/React-18.2-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-16.0-339933)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0-47A248)

## ✨ Features
- **User Authentication** - Login/Register with JWT
- **Movie Catalog** - Browse movies & series
- **Advanced Search** - Real-time search across titles/descriptions/genres
- **Category Filtering** - Filter by Action, Drama, Sci-Fi, Horror, Fantasy
- **Video Streaming** - YouTube trailer integration
- **Responsive Design** - Mobile, tablet, desktop
- **Modern UI** - Netflix-inspired design

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- MongoDB Atlas account
- Git

### Installation
```bash
# Clone repository
git clone https://github.com/ameerumar106/netflix-clone-mern.git
cd netflix-clone-mern

# Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials

# Setup frontend
cd ../frontend
npm install

# Seed database with sample movies
cd ../backend
node seed.js

# Start development servers
# Terminal 1 - Backend (port 5000)
cd backend && npm run dev

# Terminal 2 - Frontend (port 3000)  
cd frontend && npm start
```

### Environment Variables (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/netflix?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

## 📁 Project Structure
```
netflix-clone-mern/
├── backend/
│   ├── models/Movie.js, User.js
│   ├── routes/auth.js, movies.js
│   ├── middleware/auth.js
│   ├── server.js, seed.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/navbar, search, categories
│   │   ├── pages/home, watch, search, category, login
│   │   ├── context/AuthContext.js
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create user
- `POST /api/auth/login` - User login

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/random` - Get random movie
- `GET /api/movies/find/:id` - Get movie by ID
- `GET /api/movies/search?q=query` - Search movies
- `GET /api/movies/category/:category` - Movies by category
- `GET /api/movies/categories` - All categories

## 🛠️ Tech Stack
- **Frontend**: React, React Router, Axios, CSS3
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT, bcryptjs
- **Database**: MongoDB Atlas

## 🎯 Usage
1. Access: http://localhost:3000
2. Browse movies on homepage
3. Use search icon to find movies
4. Click categories to filter by genre
5. Click any movie to watch trailer
6. Register/Login for full features

## 📝 Scripts
```bash
# Backend
npm run dev      # Development mode
npm start        # Production mode

# Frontend  
npm start        # Development server
npm run build    # Production build
```

## 🤝 Contributing
1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open Pull Request

## 📄 License
MIT License - see LICENSE file for details

## 👨‍💻 Author
**Ameer Umar** - [GitHub](https://github.com/ameerumar106)

## 🌟 Acknowledgments
- Netflix for design inspiration
- TMDB for movie data
- MongoDB Atlas for database hosting
```
