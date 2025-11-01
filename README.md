# Picsum Photo Gallery

A beautiful React photo gallery application that displays images from the Picsum Photos API with infinite scrolling and detailed photo views.

## Features

- **Infinite Scrolling**: Automatically loads more photos as you scroll down
- **Photo Grid**: Responsive grid layout displaying photo thumbnails
- **Detailed Views**: Click on any photo to view detailed information
- **React Router Navigation**: Proper URL routing for navigation
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive user interface

## Routing

The application uses React Router for navigation:

- `/` or `/photos` - Main photo gallery grid
- `/photos/:id` - Detailed view of a specific photo

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API

This project uses the [Picsum Photos API](https://picsum.photos/) to fetch random photos.

## Technologies Used

- React 19
- React Router DOM
- Vite
- CSS3 (Custom styling)
- ESLint
