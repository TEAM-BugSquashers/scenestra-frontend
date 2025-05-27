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
import UserRegistration from "./pages/userRegistration/UserRegistration.jsx";
import Admin from "./pages/admin/Admin.jsx";
import AllMovie from "./pages/allMovie/AllMovie.jsx";
import Reservation from "./pages/reservationPage/Reservation.jsx";
import MyPage from "./pages/myPage/MyPage.jsx";

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
          <Route path="/allMovie/:id" element={<AllMovie />} />
          <Route path="/allMovie" element={<AllMovie />} />
          <Route path="/seeAllMovie" element={<SeeAllMovie />} />
          <Route path="/" element={<ForYou />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/seeAllMoive" element={<SeeAllMovie />} />
          <Route path="/roomSelect" element={<RoomSelect />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<UserRegistration />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;