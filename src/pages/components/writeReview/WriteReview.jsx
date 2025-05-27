import classes from './WriteReview.module.css';
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function WriteReview({onClose}) {
    const [selectedStar, setSelectedStar] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);
    const fileInputRef = useRef(null);

    const rating = (index) => {
        setSelectedStar(index);
    };

    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // 이미지 파일만 필터링
        const imageFiles = files.filter(file =>
            file.type.startsWith('image/') &&
            (file.type === 'image/jpeg' || file.type === 'image/png')
        );

        // 파일을 URL로 변환하여 미리보기 가능하게 만듦
        const imageUrls = imageFiles.map(file => ({
            file: file,
            url: URL.createObjectURL(file),
            name: file.name
        }));

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
            <div className={classes.writingPan}>
                <div className={classes.composeWrap}>
                    <div className={classes.closeComposeWrap} onClick={onClose}>×</div>
                    <div className={classes.titleInputWrap}>
                        <input placeholder={"제목을 적으시오"} />
                    </div>

                    <div className={classes.starPoint}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => rating(star)}
                                style={{ color: selectedStar >= star ? 'gold' : 'gray', cursor: 'pointer' }}
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
                            {/* 첫 번째 슬라이드: 이미지 선택 박스 */}
                            <SwiperSlide>
                                <div className={classes.imageSlide}>
                                    <div className={classes.fileSelectBox} onClick={handleFileSelect}>
                                        이미지 선택 ({selectedImages.length}개)
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* 선택된 이미지들 */}
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
                                            ×
                                        </button>
                                        {/*<div className={classes.imageName}>*/}
                                        {/*    {image.name}*/}
                                        {/*</div>*/}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className={classes.contentInputWrap}>
                        <textarea placeholder={"내용을 적으시오"} />
                    </div>

                    <div className={classes.enrollContent} onClick={onClose}>등록</div>
                </div>
            </div>
        </>
    );
}

export default WriteReview;