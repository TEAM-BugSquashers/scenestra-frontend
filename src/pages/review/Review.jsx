import classes from './Review.module.css'
import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import WriteReview from "../components/writeReview/WriteReview.jsx";
import {useParams} from "react-router-dom";
import {axiosTheaterDetails} from "../api/axios.js";

function Review(){
    const {id} = useParams();
    const [roomData, setRoomData] = useState(null);
    const [posts, setPosts] = useState([]); // initialPosts 대신 빈 배열로 초기화
    const [reviewImages, setReviewImages] = useState({}); // reviewImages 상태 추가
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedPost, setSelectedPost] = useState(null);
    const [pan, setPan] = useState(false);
    const [sortBy, setSortBy] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');
    const [showWriteForm, setShowWriteForm] = useState(false);



    useEffect(() => {
        if(id === undefined) return;

        const fetchReview = async () => {
            try{
                setLoading(true);
                console.log("API 호출 시작, ID:", id);
                const response = await axiosTheaterDetails(id);
                console.log("API 응답:", response);
                console.log("상영관 데이터:", response.data.payload);
                setRoomData(response.data.payload);


            } catch(error) {
                console.error("상영관을 못가져옴", error);
                setError("데이터를 불러오는데 실패했습니다.");
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

    const panHandler = (post) => {
        setSelectedPost(post);
        setPan(prevState => !prevState);
    }

    // 게시글 정렬 함수
    const sortPosts = (posts, sortBy, direction) => {
        return [...posts].sort((a, b) => {
            if (direction === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
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

    // 로딩 상태 처리
    if (loading) {
        return <div className={classes.loading}>로딩 중...</div>;
    }

    // 에러 상태 처리
    if (error) {
        return <div className={classes.error}>{error}</div>;
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
                    {/* roomData는 이제 단일 상영관 객체 */}
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
                        <h2>Review</h2>
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
                            <div className={classes['board_row']} key={post.id} onClick={() => panHandler(post)}>
                                <div>{post.id}</div>
                                <div>{renderStars(post.rating)}</div>
                                <div>{post.title}</div>
                                <div>{post.author}</div>
                                <div>{post.date}</div>
                                <div>{post.views}</div>
                            </div>
                        ))
                    )}
                </div>

                <div className={classes.writeWrap}>
                    <div></div>
                    <div className={classes.wrapBtn} onClick={() => setShowWriteForm(true)}>글쓰기</div>
                </div>
                <footer className={classes.footer}></footer>
            </div>

            {pan && selectedPost && (
                <div className={classes.pan} onClick={() => setPan(false)}>
                    <div className={classes.popup} onClick={(e) => e.stopPropagation()}>
                        <div className={classes.h3}>{selectedPost.title}</div>
                        <div className={classes.postDetails}>
                            <div className={classes.postInfo}>
                                <span>글번호: {selectedPost.id}</span>
                                <span>별점: {selectedPost.rating}</span>
                                <span>작성자: {selectedPost.author}</span>
                                <span>날짜: {selectedPost.date}</span>
                                <span>조회수: {selectedPost.views}</span>
                            </div>

                            {/* 리뷰 이미지가 있는 경우에만 표시 */}
                            {reviewImages[selectedPost.id] && reviewImages[selectedPost.id].length > 0 && (
                                <div className={classes.reviewImgWrap}>
                                    <Swiper
                                        modules={[Navigation]}
                                        navigation={true}
                                        loop={true}
                                        slidesPerView={1}
                                        spaceBetween={10}
                                        className={classes.reviewImg}
                                    >
                                        {reviewImages[selectedPost.id].map((image) => (
                                            <SwiperSlide key={image.id} className={classes.reviewImgContent}>
                                                <div className={classes.ImgFill} style={{ backgroundImage: `url(${image.src})` }}></div>
                                                <p className={classes.imageCaption}>{image.caption}</p>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            )}

                            <div className={classes.postContent}>
                                {selectedPost.content}
                            </div>
                            <div className={classes.postActions}>
                                <button onClick={() => setPan(false)}>닫기</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showWriteForm && (
                <WriteReview onClose={() => setShowWriteForm(false)} />
            )}
        </>
    );
}

export default Review;