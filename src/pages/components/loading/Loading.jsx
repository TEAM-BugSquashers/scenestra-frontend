// import React, { useEffect, useState } from "react";
// import classes from './Loading.module.css';
//
// function LoadingText() {
//     const letters = ['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.', '.'];
//     const [visibleCount, setVisibleCount] = useState(0);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setVisibleCount((prev) => {
//                 if (prev >= letters.length) {
//                     clearInterval(interval);
//                     return prev;
//                 }
//                 return prev + 1;
//             });
//         }, 100); // 200ms 간격
//
//         return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
//     }, []);
//
//     return (
//         <div className={classes.loadingWrap}>
//             <div className={classes.textWrap}>
//                 {letters.slice(0, visibleCount).map((char, idx) => (
//                     <span key={idx}>{char}</span>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// export default LoadingText;

import React from 'react';
import classes from './Loading.module.css';

function Loading() {
    return (
        <>
        <div className={classes.loadingWrap}>
            <div className={classes.textWrap}>
                <span>Loading...</span>


            </div>
        </div>
</>

    );

}

export default Loading;
