# CineSearch

A movie discovery app built with React and Vite. This project focuses on custom CSS architecture (no external UI libraries) and efficient API handling to create a clean, responsive interface without layout shifts.
## 🔗 Live Demo
(https://movie-search-app-sand-tau.vercel.app/)

## Overview

The goal of this project was to build a production-ready search interface from scratch. It handles data fetching from the OMDb API, manages local state for search queries, and implements a custom modal system for viewing movie details.

## Key Features

- **Custom CSS System:** Styled entirely with raw CSS using CSS variables and Flexbox/Grid—no Bootstrap or Tailwind.
- **Optimized Modals:** Features a split-layout modal (Poster/Info) designed to avoid scrolling issues common in standard popups.
- **Horizontal Flow:** Solved the "skyscraper" content problem by implementing a side-by-side layout for desktop views.
- **State Management:** clean React hooks (`useState`, `useEffect`) to handle data lifecycle and UI states.
- **Responsive:** Fully adaptive layout that switches from a grid to a stacked view on mobile devices.

## Tech Stack

- **Core:** React 18, Vite
- **Styling:** Native CSS3 (Glassmorphism effects, Backdrop Filters)
- **Data:** OMDb API (Fetch API)

## Running Locally

1.  **Clone the repo**

    ```bash
    git clone [https://github.com/swaroop999/movie-search-app.git](https://github.com/swaroop999/movie-search-app.git)
    cd movie-search-app
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

## Future Improvements

- Add pagination for search results (currently limits to first 10).
- Implement "Favorites" functionality using LocalStorage.
