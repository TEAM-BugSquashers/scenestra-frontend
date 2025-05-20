import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './pages/components/header/Header.jsx';
import Sidebar from './pages/components/sidebar/Sidebar.jsx';

// 페이지 컴포넌트들 import (아직 만들지 않았다면 생성 필요)
import SeeAllMovie from './pages/seeall/SeeAllMovie.jsx';
import RoomSelect from './pages/reviewSelect/ReviewSelect.jsx';
import Review from './pages/review/Review.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import ForYou from "./pages/forYou/ForYou.jsx";
import Login from "./pages/login/Login.jsx";

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

          <Route path="/seeAllMoive" element={<SeeAllMovie />} />
          <Route path="/roomSelect" element={<RoomSelect />} />
          <Route path="/review" element={<Review />} />
          <Route path="/forYou" element={<ForYou />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;