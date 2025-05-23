import classes from './MyPage.module.css';
import {useState} from "react";
import {axiosgroupedByGenre} from "../api/axios.js";

function MyPage() {
    axiosgroupedByGenre().then(response => {
        console.log(response)
    })

        // Original user data (simulating from database)
        const originalProfileData = {
            userId: "appleseed",
            userPw: "JohnDoe",
            userName: "John Doe",
            userMobile: "000-1111-2222",
            userEmail: "john.doe@email.com"
        };

        const originalGenreData = ["family", "performance", "horror"];

        // All available genres
        const allGenres = [
            { value: "family", label: "가족" },
            { value: "performance", label: "공연" },
            { value: "horror", label: "공포(호러)" },
            { value: "drama", label: "드라마" },
            { value: "mystery", label: "미스터리" },
            { value: "crime", label: "범죄" },
            { value: "thriller", label: "스릴러" },
            { value: "animation", label: "애니메이션" },
            { value: "action", label: "액션" },
            { value: "comedy", label: "코미디" },
            { value: "fantasy", label: "판타지" },
            { value: "scifi", label: "SF" }
        ];

        // State for form data
        const [formData, setFormData] = useState(originalProfileData);
        const [selectedGenres, setSelectedGenres] = useState(originalGenreData);
        const [confirmPassword, setConfirmPassword] = useState('');

        // Edit mode state
        const [isEditMode, setIsEditMode] = useState(false);

        // Backup for cancel functionality
        const [backupData, setBackupData] = useState(originalProfileData);
        const [backupGenres, setBackupGenres] = useState(originalGenreData);

        // Current and past reservation data
        const currResData = {
            num: "A000-1111-2222",
            date: "2025년 2월 5일",
            time: "12:00",
            room: "Theater A",
            movie: "Cars 2",
            name: "John Doe",
            mobile: "000-1111-2222"
        };

        const pastResData = [
            {
                num: "B000-1111-2222",
                date: "2025년 2월 5일",
                time: "12:00",
                room: "Theater A",
                movie: "Cars 2",
            },
            {
                num: "C000-1111-2222",
                date: "2025년 2월 5일",
                time: "12:00",
                room: "Theater A",
                movie: "Cars 2",
            }
        ];

        // Handle input changes
        const handleInputChange = (e) => {
            const { id, value } = e.target;
            setFormData({ ...formData, [id]: value });
        };

        // Handle genre changes
        const handleGenreChange = (e) => {
            const { id, checked } = e.target;

            if (checked) {
                if (selectedGenres.length >= 3) {
                    alert('선호하는 장르는 3개까지만 선택할 수 있습니다.');
                    return;
                }
                setSelectedGenres([...selectedGenres, id]);
            } else {
                setSelectedGenres(selectedGenres.filter(genre => genre !== id));
            }
        };

        // Handle edit profile button
        const handleEditProfile = () => {
            if (!isEditMode) {
                // Enter edit mode
                setIsEditMode(true);
                setBackupData({ ...formData });
                setBackupGenres([...selectedGenres]);
                setFormData({ ...formData, userPw: '' }); // Clear password for editing
                setConfirmPassword('');
            } else {
                // Save changes
                if (formData.userPw !== '' && formData.userPw !== confirmPassword) {
                    alert('비밀번호가 일치하지 않습니다.');
                    return;
                }

                if (selectedGenres.length !== 3) {
                    alert('선호하는 장르 3개를 선택해주세요.');
                    return;
                }

                // Update password if changed
                const updatedData = { ...formData };
                if (formData.userPw === '') {
                    updatedData.userPw = backupData.userPw; // Keep original password
                }

                setFormData(updatedData);
                setIsEditMode(false);
                setConfirmPassword('');

                console.log("Saving updated user data:", {
                    ...updatedData,
                    selectedGenres
                });
            }
        };

        // Handle cancel edit
        const handleCancelEdit = () => {
            setFormData({ ...backupData });
            setSelectedGenres([...backupGenres]);
            setConfirmPassword('');
            setIsEditMode(false);
        };

        // Get display password (masked or editable)
        const getDisplayPassword = () => {
            if (isEditMode) {
                return formData.userPw;
            }
            return '********';
        };

        return (
            <div className={classes["body"]}>
                <div className={`${classes["sectionWrap"]}`}>
                    {/* Top Section */}
                    <section className={`${classes["top"]} bTitle`}>
                        <div className={classes["horLine"]}></div>
                        <h2 className={classes["barTitle"]}>MY PAGE</h2>
                        <div className={classes["horLine"]}></div>
                    </section>

                    {/* Bottom Section */}
                    <section className={classes["bottom"]}>
                        {/* Left - Current Reservation */}
                        <article className={classes["left"]}>
                            <div className={`${classes["currWrap"]} ${classes["contentBox"]}`}>
                                {/* Title bar */}
                                <div className={`${classes["conBoxBar"]}`}>
                                    <div className={classes["horLine"]}></div>
                                    <div className={`${classes["barTitle"]}`}>MY RESERVATION</div>
                                    <div className={classes["horLine"]}></div>
                                </div>

                                {/* Content */}
                                <div className={classes["currBox"]}>
                                    <div className={classes["currBoxTop"]}>
                                        <div className={classes["num"]}>
                                            예약번호 <span style={{ color: '#b2a69b' }}>{currResData.num}</span>
                                        </div>
                                        <div className={classes["date"]}>
                                            날짜 <span style={{ color: '#b2a69b' }}>{currResData.date}</span>
                                        </div>
                                        <div className={classes["time"]}>
                                            시간 <span style={{ color: '#b2a69b' }}>{currResData.time}</span>
                                        </div>
                                        <div className={classes["room"]}>
                                            방 <span style={{ color: '#b2a69b' }}>{currResData.room}</span>
                                        </div>
                                        <div className={classes["movie"]}>
                                            영화 <span style={{ color: '#b2a69b' }}>{currResData.movie}</span>
                                        </div>
                                    </div>
                                    <div className={classes["currBoxBot"]}>
                                        <div className={classes["name"]}>
                                            예약자 <span style={{ color: '#b2a69b' }}>{currResData.name}</span>
                                        </div>
                                        <div className={classes["mobile"]}>
                                            전화번호 <span style={{ color: '#b2a69b' }}>{currResData.mobile}</span>
                                        </div>
                                    </div>
                                    <button type="submit" className={`${classes["bigBtn"]} ${classes["cancelResBtn"]}`}>
                                        CANCEL RESERVATION
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Right */}
                        <article className={classes["right"]}>
                            {/* Profile */}
                            <div className={`${classes["profileWrap"]} ${classes["contentBox"]}`}>
                                {/* Title bar */}
                                <div className={`${classes["conBoxBar"]}`}>
                                    <div className={classes["horLine"]}></div>
                                    <div className={`${classes["barTitle"]}`}>MY PROFILE</div>
                                    <div className={classes["horLine"]}></div>
                                </div>

                                {/* Form Fields */}
                                <div className={classes["userProfile"]}>
                                    {/* User ID */}
                                    <div className={classes["idWrap"]}>
                                        <div className={classes["formField"]}>
                                            <input
                                                type="text"
                                                id="userId"
                                                value={formData.userId}
                                                readOnly
                                                placeholder=" "
                                            />
                                            <label htmlFor="userId">아이디</label>
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className={classes["formField"]}>
                                        <input
                                            type={isEditMode ? "password" : "text"}
                                            id="userPw"
                                            value={getDisplayPassword()}
                                            onChange={handleInputChange}
                                            readOnly={!isEditMode}
                                            placeholder=" "
                                        />
                                        <label htmlFor="userPw">비밀번호</label>
                                    </div>

                                    {/* Confirm Password - only show in edit mode */}
                                    {isEditMode && (
                                        <div className={classes["formField"]}>
                                            <input
                                                type="password"
                                                id="chkPw"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder=" "
                                            />
                                            <label htmlFor="chkPw">비밀번호 확인</label>
                                        </div>
                                    )}

                                    {/* Name */}
                                    <div className={classes["formField"]}>
                                        <input
                                            type="text"
                                            id="userName"
                                            value={formData.userName}
                                            readOnly
                                            placeholder=" "
                                        />
                                        <label htmlFor="userName">이름</label>
                                    </div>

                                    {/* Mobile */}
                                    <div className={classes["formField"]}>
                                        <input
                                            type="text"
                                            id="userMobile"
                                            value={formData.userMobile}
                                            onChange={handleInputChange}
                                            readOnly={!isEditMode}
                                            placeholder=" "
                                        />
                                        <label htmlFor="userMobile">전화번호</label>
                                    </div>

                                    {/* Email */}
                                    <div className={classes["formField"]}>
                                        <input
                                            type="text"
                                            id="userEmail"
                                            value={formData.userEmail}
                                            onChange={handleInputChange}
                                            readOnly={!isEditMode}
                                            placeholder=" "
                                        />
                                        <label htmlFor="userEmail">이메일 주소</label>
                                    </div>

                                    {/* Genres */}
                                    <div className={classes["genre"]}>
                                        <div className={classes["genreBar"]}>
                                            <div className={classes["genreTitle"]}>선호하는 장르 3개 선택해주세요</div>
                                            <div className={classes["horLine"]}></div>
                                        </div>

                                        <div className={classes["genreBox"]}>
                                            {(isEditMode ? allGenres : allGenres.filter(genre => selectedGenres.includes(genre.value))).map((genre) => (
                                                <div key={genre.value}>
                                                    <input
                                                        type="checkbox"
                                                        name="chkGenre"
                                                        id={genre.value}
                                                        value={genre.value}
                                                        checked={selectedGenres.includes(genre.value)}
                                                        onChange={handleGenreChange}
                                                        disabled={!isEditMode || (!selectedGenres.includes(genre.value) && selectedGenres.length >= 3)}
                                                    />
                                                    <label className={classes["genreChkBx"]}
                                                        htmlFor={genre.value}
                                                        style={{
                                                            backgroundColor: selectedGenres.includes(genre.value) ? '#32271e' : 'white', color: selectedGenres.includes(genre.value) ? 'white' : '#b2a69b', borderColor: selectedGenres.includes(genre.value) ? '#32271e' : '#b2a69b', cursor: isEditMode ? 'pointer' : 'default'
                                                            }}
                                                    >
                                                        {genre.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <button
                                    type="submit"
                                    className={`${classes["bigBtn"]} ${classes["btn1"]}`}
                                    onClick={handleEditProfile}
                                >
                                    {isEditMode ? 'SAVE EDIT' : 'EDIT PROFILE'}
                                </button>

                                {isEditMode && (
                                    <button
                                        type="submit"
                                        className={classes["cancelBtn"]}
                                        onClick={handleCancelEdit}
                                    >
                                        CANCEL EDIT
                                    </button>
                                )}
                            </div>

                            {/* Past Reservations */}
                            <div className={`${classes["pastWrap"]} ${classes["contentBox"]} ${classes["wBg"]} ${classes["wMain"]}`}>
                                {/* Title bar */}
                                <div className={`${classes["conBoxBar"]} ${classes["wTitle"]}`}>
                                    <div className={classes["horLine"]}></div>
                                    <div className={`${classes["barTitle"]} ${classes["subtitle"]}`}>PAST RESERVATIONS</div>
                                    <div className={classes["horLine"]}></div>
                                </div>

                                {/* Past reservation boxes */}
                                {pastResData.map((reservation, index) => (
                                    <div
                                        key={index}
                                        className={`${classes["pastBox"]} ${index === pastResData.length - 1 ? classes["marBotDel"] : ''}`}
                                    >
                                        <div className={classes["pastNum"]}>{reservation.num}</div>

                                        <div className={classes["pastBoxLeft"]}>
                                            <div className={classes["pastDate"]}>
                                                날짜 <span style={{ color: '#b2a69b' }}>{reservation.date}</span>
                                            </div>
                                            <div className={classes["pastTime"]}>
                                                시간 <span style={{ color: '#b2a69b' }}>{reservation.time}</span>
                                            </div>
                                            <div className={classes["pastRoom"]}>
                                                방 <span style={{ color: '#b2a69b' }}>{reservation.room}</span>
                                            </div>
                                            <div className={classes["pastMovie"]}>
                                                영화 <span style={{ color: '#b2a69b' }}>{reservation.movie}</span>
                                            </div>
                                        </div>

                                        <div className={classes["pastBoxRight"]}>
                                            <img src="/api/placeholder/150/120"
                                                className={classes["pastImg"]}
                                                alt="Theater Image"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </section>
                </div>
            </div>
        );
}

export default MyPage