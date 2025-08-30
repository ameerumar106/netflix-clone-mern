// backend/seed.js
const mongoose = require('mongoose');
const Movie = require('./models/Movie');
require('dotenv').config();

const sampleMovies = [
  {
    title: "The Witcher",
    desc: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
    img: "https://image.tmdb.org/t/p/w500/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg",
    imgTitle: "https://logowik.com/content/uploads/images/the-witcher-series8028.jpg",
    imgThumb: "https://image.tmdb.org/t/p/w300/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg",
    trailer: "https://www.youtube.com/embed/ndl1W4ltcmg",
    video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    year: "2019",
    limit: 16,
    genre: "Fantasy",
    isSeries: true
  },
  {
    title: "Stranger Things",
    desc: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    img: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    imgTitle: "https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png",
    trailer: "https://www.youtube.com/embed/b9EkMc79ZSU",
    year: "2016",
    limit: 16,
    genre: "Sci-Fi",
    isSeries: true
  },
  {
    title: "Avengers: Endgame",
    desc: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.",
    img: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    imgTitle: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Avengers_Endgame_Logo_Black.png",
    trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
    year: "2019",
    limit: 13,
    genre: "Action",
    isSeries: false
  },
  {
    title: "The Queen's Gambit",
    desc: "In a 1950s orphanage, a young girl reveals an astonishing talent for chess and begins an unlikely journey to stardom while grappling with addiction.",
    img: "https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
    imgTitle: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/The_Queen%27s_Gambit_%28miniseries%29_logo.svg/1200px-The_Queen%27s_Gambit_%28miniseries%29_logo.svg.png",
    trailer: "https://www.youtube.com/embed/CDrieqwSdgI",
    year: "2020",
    limit: 16,
    genre: "Drama",
    isSeries: true
  },
  {
    title: "John Wick",
    desc: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog and stole his car.",
    img: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    imgTitle: "https://upload.wikimedia.org/wikipedia/commons/7/7e/John_Wick_Logo.png",
    trailer: "https://www.youtube.com/embed/C0BMx-qxsP4",
    year: "2014",
    limit: 18,
    genre: "Action",
    isSeries: false
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing movies
    await Movie.deleteMany({});
    console.log('Cleared existing movies');
    
    // Add sample movies
    await Movie.insertMany(sampleMovies);
    console.log('Sample movies added successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();