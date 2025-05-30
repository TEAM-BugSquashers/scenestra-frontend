import classes from './Review.module.css'
import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import WriteReview from "../components/writeReview/WriteReview.jsx";
import {useParams} from "react-router-dom";
import {axiosReviewPopups, axiosTheaterDetails, axiosTheaterReviews} from "../api/axios.js";

function Review(){
    const {id} = useParams();
    const [roomData, setRoomData] = useState(null);
    const [posts, setPosts] = useState([]); // 리뷰 목록 (기본 정보)
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [pan, setPan] = useState(false);
    const [sortBy, setSortBy] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');
    const [popupData, setPopupData] = useState([]); // 모든 리뷰의 상세 정보

    // popupData 가져오기 (모든 리뷰의 상세 정보)
    useEffect(() => {
        const fetchPopupReview = async () => {
            try{
                const response = await axiosReviewPopups(id);
                setPopupData(response.data.payload);
                console.log('popupData:', response.data.payload);
            }catch(error){
                console.log('팝업 데이터 가져오기 실패:', error);
            }
        }
        if (id) {
            fetchPopupReview();
        }
    }, [id]);
    // 리뷰 목록 가져오기
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosTheaterReviews(id);
                setPosts(response.data);
                console.log("리뷰 목록:", response.data);
            } catch (error) {
                console.error('리뷰 목록 전체를 못가져옴', error);
                console.log('에러 상세:', error.response?.data);
            }
        }
        if (id) {
            fetchReviews();
        }
    }, [id]);

    useEffect(() => {
        if(id === undefined) return;

        const fetchReview = async () => {
            try{
                setLoading(true);
                const response = await axiosTheaterDetails(id);
                setRoomData(response.data.payload);

            } catch(error) {
                console.error("상영관을 못가져옴", error);
                if(error.response) {
                    console.error("HTTP 상태 코드:", error.response.status);
                    console.error("서버 응답 데이터:", error.response.data);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchReview();
    }, [id]);

    const panHandler = (clickedPost) => {
        console.log('클릭된 리뷰:', clickedPost);
        setSelectedReviewId(clickedPost);
        setPan(true);
    }

    useEffect(() => {
        setSelectedPost(null);
        axiosReviewPopups(selectedReviewId)
        .then(res => {
            console.log(res.data.payload);
            setSelectedPost(res.data.payload);
        }).catch(err => {
            console.log(err)
            setSelectedPost(null);
        });
    }, [selectedReviewId])

    // 게시글 정렬 함수
    const sortPosts = (posts, sortBy, direction) => {
        if (!posts || !Array.isArray(posts)) {
            return [];
        }

        return [...posts].sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'rating') {
                aValue = a.star;
                bValue = b.star;
            } else if (sortBy === 'date') {
                aValue = a.regDate;
                bValue = b.regDate;
            } else if (sortBy === 'views') {
                aValue = a.viewCount;
                bValue = b.viewCount;
            }

            if (direction === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    };

    // 정렬 변경 핸들러
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' :'asc');
        } else {
            setSortBy(column);
            setSortDirection('desc');
        }
    };

    // 정렬된 게시글
    const sortedPosts = sortPosts(posts, sortBy, sortDirection);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span key={i}>★</span>);
            } else {
                stars.push(<span key={i}>☆</span>);
            }
        }
        return <span className={classes.starRating}>{stars}</span>;
    };

    if (loading) {
        return <div className={classes.loading}>로딩 중...</div>;
    }

    return (
        <>
            <div className={classes.wrap}>
                <div className={classes["section_header"]}>
                    <div></div>
                    <h2 className={classes.h2}>ABOUT THIS THEATER</h2>
                    <div></div>
                </div>

                <section className={classes.section}>
                    {roomData && (
                        <>
                            <figure
                                className={classes.roomImg}
                                style={{
                                    backgroundImage: `url(${roomData.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                            </figure>

                            <figcaption className={classes["imgDescription"]}>
                                <h3>{roomData.name}</h3>
                                <p>{roomData.info}</p>
                                <p>가격: {roomData.price.toLocaleString()}원</p>
                                <p>수용인원: {roomData.numPeople}~{roomData.numPeopleMax}명</p>
                            </figcaption>
                        </>
                    )}
                </section>

                <div className={classes.main}>
                    <div className={classes["section_header"]}>
                        <div></div>
                        <h2>REVIEW</h2>
                        <div></div>
                    </div>

                    <div className={classes["board_header"]}>
                        <div onClick={() => handleSort('id')}>글번호
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.5 5.5l6 6 6-6H1.5z" />
                                </svg>
                            </span>
                        </div>
                        <div onClick={() => handleSort('rating')}>별점
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.5 5.5l6 6 6-6H1.5z" />
                                </svg>
                            </span>
                        </div>
                        <div>제목</div>
                        <div>작성자</div>
                        <div onClick={() => handleSort('date')}>날짜
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.5 5.5l6 6 6-6H1.5z" />
                                </svg>
                            </span>
                        </div>
                        <div onClick={() => handleSort('views')}>조회수
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.5 5.5l6 6 6-6H1.5z" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    {posts.length === 0 ? (
                        <div className={classes.noReviews}>등록된 리뷰가 없습니다.</div>
                    ) : (
                        sortedPosts.map((post) => (
                            <div className={classes['board_row']} key={post.reviewId} onClick={() => panHandler(post.reviewId)}>
                                <div>{post.reviewId}</div>
                                <div>{renderStars(post.star)}</div>
                                <div>{post.title}</div>
                                <div>{post.username}</div>
                                <div>{post.regDate.slice(0,10)}</div>
                                <div>{post.viewCount}</div>
                            </div>
                        ))
                    )}
                </div>

                <footer className={classes.footer}></footer>
            </div>

            {pan && selectedPost && (
                <div className={classes.pan} onClick={() => setPan(false)}>
                    <div className={classes.popup} onClick={(e) => e.stopPropagation()}>
                        <div className={classes.h3}>{selectedPost.title}</div>
                        <div className={classes.postDetails}>
                            <div className={classes.postInfo}>
                                <span>글번호: {selectedPost.reviewId}</span>
                                <span>별점: {selectedPost.star}</span>
                                <span>작성자: {selectedPost.username}</span>
                                <span>날짜: {selectedPost.regDate?.slice(0,10)}</span>
                                <span>조회수: {selectedPost.viewCount}</span>
                            </div>

                            {/* 리뷰 이미지가 있는 경우에만 표시 */}
                            {selectedPost.imageUrls && selectedPost.imageUrls.length > 0 && (
                                <div className={classes.reviewImgWrap}>
                                    <Swiper
                                        modules={[Navigation]}
                                        navigation={true}
                                        loop={true}
                                        slidesPerView={1}
                                        spaceBetween={10}
                                        className={classes.reviewImg}
                                    >
                                        {selectedPost.imageUrls.map((imageUrl, index) => (
                                            <SwiperSlide key={index} className={classes.reviewImgContent}>
                                                <div className={classes.ImgFill} style={{ backgroundImage: `url(${imageUrl})` }}></div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            )}

                            <div className={classes.postContent}>
                                {selectedPost.content || '내용이 없습니다.'}
                            </div>
                            <div className={classes.postActions}>
                                <button onClick={() => setPan(false)}>닫기</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Review;