
// import { useState } from 'react';
// import Header from './components/header/Header';
// import Sidebar from './components/sidebar/Sidebar';
// import Footer from './components/footer/Footer'

// function App() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
  
//   const toggleMenu = () => {
//     setIsMenuOpen(prevState => !prevState);
//   };

//   return (
//     <>
//       <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      
//       <Sidebar isOpen={isMenuOpen} toggleSidebar={toggleMenu} />
      
//       <main>
//       </main>
//       {/* <Footer /> */}
//     </>
//   );
// }

// export default App;

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';

// 페이지 컴포넌트들 import (아직 만들지 않았다면 생성 필요)
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import NotFound from './NotFound/NotFound';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <BrowserRouter>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      
      <Sidebar isOpen={isMenuOpen} toggleSidebar={toggleMenu} />
      
      {/* <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main> */}
      
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;