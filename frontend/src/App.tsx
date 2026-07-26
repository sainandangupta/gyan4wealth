import { Routes, Route } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { About } from './pages/About';
import { PillarsOverview } from './pages/PillarsOverview';
import { PillarDetail } from './pages/PillarDetail';
import { BlogListing } from './pages/BlogListing';
import { BlogArticle } from './pages/BlogArticle';
import { Pricing } from './pages/Pricing';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';
import { Courses } from './pages/Courses';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* Dashboard uses its own Sidebar layout, not the public Header */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/pillars" element={<PillarsOverview />} />
      <Route path="/pillars/:slug" element={<PillarDetail />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/blog" element={<BlogListing />} />
      <Route path="/blog/:slug" element={<BlogArticle />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
