import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Reservations from "./pages/Reservations";
import Catering from "./pages/Catering";
import Blogs from "./pages/Blogs";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="menu" element={<Menu />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="events" element={<Events />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="catering" element={<Catering />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="legal/:page" element={<Legal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
