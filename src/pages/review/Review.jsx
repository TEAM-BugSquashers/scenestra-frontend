import classes from './Review.module.css'
import { useState} from "react";
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";

function Review(){
    // 각 리뷰 포스트별 이미지 배열
    const reviewImages = {
        1: [
            {
                id: 1,
                src: "/images/review1_1.jpg",
                alt: "최신 컬렉션 메인 제품",
                caption: "2025 S/S 프리미엄 컬렉션 대표 아이템"
            },
            {
                id: 2,
                src: "/images/review1_2.jpg",
                alt: "컬렉션 디테일 샷",
                caption: "정교한 디테일과 마감"
            },
            {
                id: 3,
                src: "/images/review1_3.jpg",
                alt: "착용 모습",
                caption: "실제 착용했을 때의 모습"
            }
        ],
        2: [
            {
                id: 4,
                src: "/images/review2_1.jpg",
                alt: "VIP 멤버십 이벤트 현장",
                caption: "프라이빗 쇼핑 이벤트 현장"
            },
            {
                id: 5,
                src: "/images/review2_2.jpg",
                alt: "VIP 라운지",
                caption: "특별한 VIP 전용 공간"
            }
        ],
        3: [
            {
                id: 6,
                src: "/images/review3_1.jpg",
                alt: "파리 전시회 포스터",
                caption: "파리 전시회 공식 포스터"
            },
            {
                id: 7,
                src: "/images/review3_2.jpg",
                alt: "전시회 초대권",
                caption: "한정판 전시회 초대권"
            },
            {
                id: 8,
                src: "/images/review3_3.jpg",
                alt: "전시회장 전경",
                caption: "파리 전시회장 내부 모습"
            },
            {
                id: 9,
                src: "/images/review3_4.jpg",
                alt: "특별 전시품",
                caption: "이번 전시회의 하이라이트 작품"
            }
        ],
        4: [
            {
                id: 10,
                src: "/images/review4_1.jpg",
                alt: "리미티드 에디션 제품",
                caption: "한정판 리미티드 에디션"
            },
            {
                id: 11,
                src: "/images/review4_2.jpg",
                alt: "특별 패키징",
                caption: "리미티드 에디션 전용 패키징"
            }
        ],
        5: [
            {
                id: 12,
                src: "/images/review5_1.jpg",
                alt: "고객 감사 이벤트",
                caption: "고객 감사 이벤트 현장"
            },
            {
                id: 13,
                src: "/images/review5_2.jpg",
                alt: "특별 선물",
                caption: "감사의 마음을 담은 특별 선물"
            },
            {
                id: 14,
                src: "/images/review5_3.jpg",
                alt: "이벤트 참여 고객들",
                caption: "이벤트에 참여한 소중한 고객들"
            }
        ]
    };

    const initialPosts = [
        {
            id: 1,
            rating: 5,
            title: "최신 컬렉션 출시 안내",
            author: "Sarah Johnson",
            date: "2025-05-10",
            views: 423,
            comments: 15,
            content: "2025 S/S 시즌을 맞이하여 새로운 프리미엄 컬렉션이 출시되었습니다. 한정판 아이템을 지금 확인해보세요."
        },
        {
            id: 2,
            rating: 3,
            title: "VIP 멤버십 혜택 안내",
            author: "Thomas Lee",
            date: "2025-05-08",
            views: 387,
            comments: 23,
            content: "VIP 멤버분들을 위한 특별한 혜택이 준비되어 있습니다. 프라이빗 쇼핑 이벤트와 함께 즐거운 경험을 만나보세요."
        },
        {
            id: 3,
            rating: 4,
            title: "파리 전시회 초대권 이벤트",
            author: "Michelle Park",
            date: "2025-05-05",
            views: 562,
            comments: 42,
            content: "오는 6월 파리에서 열리는 프리미엄 전시회 초대권을 드립니다. 응모 방법을 확인해보세요."
        },
        {
            id: 4,
            rating: 2,
            title: "리미티드 에디션 예약 안내",
            author: "David Kim",
            date: "2025-05-01",
            views: 621,
            comments: 31,
            content: "곧 출시될 리미티드 에디션 제품의 예약이 시작되었습니다. 수량이 한정되어 있으니 서둘러 예약하세요."
        },
        {
            id: 5,
            rating: 5,
            title: "고객 감사 이벤트 안내",
            author: "Emma Wilson",
            date: "2025-04-28",
            views: 493,
            comments: 27,
            content: "항상 저희 브랜드를 사랑해주시는 고객님들을 위한 특별한 감사 이벤트를 준비했습니다."
        }
    ];

    const navi = useNavigate();
    const [selectedPost, setSelectedPost] = useState(null);
    const [pan, setPan] = useState(false);
    const [posts] = useState(initialPosts);
    const [sortBy, setSortBy] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');

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
                // 채워진 별
                stars.push(
                    <span key={i}>★</span>
                );
            } else {
                // 빈 별
                stars.push(
                    <span key={i}>☆</span>
                );
            }
        }

        return <span className={classes.starRating}>{stars}</span>;
    };

    return (
        <>
            <div className={classes.wrap}>
                <div className={classes["section_header"]}>
                    <div></div>
                    <h2 className={classes.h2}>ABOUT THIS THEATER</h2>
                    <div></div>
                </div>

                <section className={classes.section}>
                    <figure className={classes.roomImg}></figure>
                    <figcaption className={classes["imgDescription"]}>
                        여기에 상영관 설명이 들어가요<br></br>
                        상영관에 대한 설명<br></br>
                        상영관 설명<br></br>
                        어쩌구저쩌구 어쩌구저쩌구 상영관이 조아요 넓어요 음향짱짱이에요 굿굿<br></br>
                        몇줄이들어갈지모르겠지만 여튼 상영관 설명이 여기에 들어감<br></br>
                    </figcaption>
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

                    {sortedPosts.map((post) => (
                        <div className={classes['board_row']} key={post.id} onClick={() => panHandler(post)}>
                            <div>{post.id}</div>
                            <div>{renderStars(post.rating)}</div>
                            <div>{post.title}</div>
                            <div>{post.author}</div>
                            <div>{post.date}</div>
                            <div>{post.views}</div>
                        </div>
                    ))}
                </div>

                <div className={classes.wrtieWrap}>
                    <div></div>
                    <div className={classes.wrapBtn} onClick={() => {navi("/WriteReview")}}>글쓰기</div>
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
                            <div className={classes.reviewImgWrap}>
                                <Swiper
                                    modules={[Navigation]}
                                    navigation
                                    loop={false}
                                    slidesPerView={1}
                                    spaceBetween={0}
                                    className={classes.reviewImg}
                                >
                                    {reviewImages[selectedPost.id]?.map((image) => (
                                        <SwiperSlide key={image.id} className={classes.reviewImgContent}>
                                            <img src={image.src} alt={image.alt} />
                                            <p className={classes.imageCaption}>{image.caption}</p>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
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
        </>
    );
}

export default Review;