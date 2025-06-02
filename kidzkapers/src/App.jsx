

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import VideoGallery from './pages/VideoGallery';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
      {/* Header stays fixed outside Routes */}
      <Header />
      
      {/* Main content with padding to account for fixed header */}
      <main className=" min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<VideoGallery />} />
        </Routes>
      </main>
      
      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;