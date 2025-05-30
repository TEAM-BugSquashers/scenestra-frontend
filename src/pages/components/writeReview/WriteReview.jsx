import classes from './WriteReview.module.css';
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect } from 'react';
import {axiosWriteReview} from "../../api/axios.js";

function WriteReview({onClose, id}) {
    const [selectedStar, setSelectedStar] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);
    const fileInputRef = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('reservationId', id);
            formData.append('title', title);
            formData.append('content', content);
            formData.append('star', selectedStar);

            // 이미지가 있는 경우에만 추가
            if (selectedImages.length > 0) {
                selectedImages.forEach((image, index) => {
                    // 배열로 전송하기 위해 인덱스 포함
                    formData.append(`images[${index}]`, image.file);
                    // 또는 서버 구현에 따라 이렇게 할 수도 있음:
                    // formData.append('images', image.file);
                });
            }

            console.log('전송할 데이터:', {
                reservationId: id,
                title,
                content,
                star: selectedStar,
                imageCount: selectedImages.length
            });

            await axiosWriteReview(formData);
            alert('리뷰가 등록되었습니다!');
            onClose();
        } catch (error) {
            console.error('리뷰 등록 실패:', error);
            console.error('에러 상세:', error.response?.data);
            alert(error.response?.data.payload);
        }
    }

    useEffect(() => {
        // 팝업이 열릴 때 스크롤 막기
        document.body.style.overflow = 'hidden';

        // 컴포넌트 언마운트 시 스크롤 복원
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleClose = () => {
        // 닫기 전에 스크롤 복원
        if(confirm("취소?")) {
            document.body.style.overflow = 'unset';
            onClose();
        }
    };

    const rating = (index) => {
        setSelectedStar(index);
    };

    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    // 이미지를 Base64로 변환하는 함수 (서버가 string을 기대하는 경우)
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);

        // 이미지 파일만 필터링
        const imageFiles = files.filter(file =>
            file.type.startsWith('image/') &&
            (file.type === 'image/jpeg' || file.type === 'image/png')
        );

        // 파일을 URL로 변환하여 미리보기 가능하게 만듦
        const imageUrls = await Promise.all(
            imageFiles.map(async (file) => ({
                file: file,
                url: URL.createObjectURL(file),
                name: file.name,
                base64: await fileToBase64(file) // Base64 변환 추가
            }))
        );

        setSelectedImages(prev => [...prev, ...imageUrls]);
    };

    const removeImage = (indexToRemove) => {
        setSelectedImages(prev => {
            // 메모리 누수 방지를 위해 Object URL 해제
            URL.revokeObjectURL(prev[indexToRemove].url);
            return prev.filter((_, index) => index !== indexToRemove);
        });
    };

    return (
        <>
            <div className={classes.writingPan} onClick={handleClose}>
                <div className={classes.composeWrap} onClick={(e) => e.stopPropagation()}>
                    <div className={classes.closeComposeWrap} onClick={onClose}>
                        <div className={classes.topExLeft}></div>
                        <div className={classes.topExRight}></div>
                    </div>
                    <div className={classes.titleInputWrap}>
                        <input
                            placeholder={"제목을 적으시오"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className={classes.starPoint}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => rating(star)}
                                style={{ color: selectedStar >= star ? 'gold' : '#b2a69b', cursor: 'pointer' }}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        accept="image/jpeg,image/png"
                        style={{ display: 'none' }}
                    />

                    <div className={classes.imageSwiper}>
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={10}
                            slidesPerView={3}
                            navigation
                            pagination={{ clickable: true }}
                            className={classes.swiper}
                        >
                            <SwiperSlide>
                                <div className={classes.imageSlide}>
                                    <div className={classes.fileSelectBox} onClick={handleFileSelect}>
                                        이미지 선택 ({selectedImages.length}개)
                                    </div>
                                </div>
                            </SwiperSlide>

                            {selectedImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className={classes.imageSlide}>
                                        <img
                                            src={image.url}
                                            alt={image.name}
                                            className={classes.previewImage}
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className={classes.removeImageBtn}
                                        >
                                            <div className={classes.xWrap}>
                                                <div className={classes.exLeft}></div>
                                                <div className={classes.exRight}></div>
                                            </div>
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className={classes.contentInputWrap}>
                        <textarea
                            placeholder={"내용을 적으시오"}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className={classes.enrollContent} onClick={handleSubmit}>POST REVIEW</div>
                </div>
            </div>
        </>
    );
}

export default WriteReview;