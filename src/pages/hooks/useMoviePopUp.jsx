import { useState } from 'react';

//영화 팝업창 열고닫는 상태관리 컴포넌트입니다.

function useMoviePopUp() {
    const [selectedMovieData, setSelectedMovieData] = useState(null);
    const handleSelectMovie = (movieData) => {
        console.log('Movie selected:', movieData);
        setSelectedMovieData(movieData);
    };
    const handleClosePopUp = () => {
        setSelectedMovieData(null);
    }
    return [selectedMovieData, handleSelectMovie, handleClosePopUp];
}

export default useMoviePopUp;