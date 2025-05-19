
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
import Header from './pages/components/header/Header.jsx';
import Sidebar from './pages/components/sidebar/Sidebar.jsx';

// 페이지 컴포넌트들 import (아직 만들지 않았다면 생성 필요)
import SeeAllMovie from './pages/seeall/SeeAllMovie.jsx';
import RoomSelect from './pages/reviewSelect/ReviewSelect.jsx';
import Review from './pages/review/Review.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Login from "./pages/login/Login.jsx";
import UserRegistration from "./pages/userRegistration/UserRegistration.jsx";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <BrowserRouter>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      
      <Sidebar isOpen={isMenuOpen} toggleSidebar={toggleMenu} />
      
      <main>
        <Routes>
          <Route path="/SeeAllMovie" element={<SeeAllMovie />} />
          <Route path="/RoomSelect" element={<RoomSelect />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/" element={<Login />} />
          <Route path="/UserRegistration" element={<UserRegistration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;