import classes from './MyPage.module.css';
import {useEffect, useRef, useState} from "react";
import {
    axiosGenres,
    axiosInfo,
    axiosMe,
    axiosPassword,
    axiosPreferredGenres, axiosResAll, axiosResDel,
    axiosResInProgress, axiosTheaters
} from "../api/axios.js";
import WriteReview from "../components/writeReview/WriteReview.jsx";

function MyPage() {
    // states
    const [formData, setFormData] = useState({});
    const [allGenres, setAllGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [hoveredGenre, setHoveredGenre] = useState(null);
    const [currRes, setCurrRes] = useState([]);
    const [pastRes, setPastRes] = useState([]);
    const [theaterImg, setTheaterImg] = useState([]);
    const [showWriteForm, setShowWriteForm] = useState(false);

    // password states
    const [currentPassword, setCurrentPassword] = useState('********');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [showPasswordMask, setShowPasswordMask] = useState(true);

    // edit mode states
    const [isEditMode, setIsEditMode] = useState(false);
    const [isPwEditMode, setIsPwEditMode] = useState(false);

    // backup states for cancel functionality
    const [backupData, setBackupData] = useState({});
    const [backupGenres, setBackupGenres] = useState([]);

    // loading/error states
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // just-unselected genre ref
    const justUnselectedRef = useRef({
        id: null,
        mouseLeft: false
    });

    // touch states
    const [isTouched, setIsTouched] = useState(false);
    const [btnIsTouched, setBtnIsTouched] = useState(null);
    // const touchTimeoutRef = useRef(null);

    // touch functions
    const handleTouchStart = () => {
        // if (touchTimeoutRef.current) {
        //     clearTimeout(touchTimeoutRef.current);
        // }
        // setBtnIsTouched(reservationNum);
        setIsTouched(true);
    };

    const handleTouchEnd = () => {
        // touchTimeoutRef.current = setTimeout(() => {
        //     setBtnIsTouched(null);
        // }, 100);
        setIsTouched(false);
    };

    // load (in background) user profile data & reservation data
    useEffect(() => {
        const fetchMyData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // fetch user profile and genres
                const [profileResponse, genresResponse ] = await Promise.all([
                    axiosMe(),
                    axiosGenres(),
                ]);

                // set user profile
                const profileData = profileResponse.data.payload;
                setFormData(profileData);
                setBackupData(profileData);

                // set selected genres
                const userGenres = profileData.userGenres?.map(genre => String(genre.genreId)) || [];
                // ? safety checks if userGenres exists before attempting .map; [] is a fallback
                setSelectedGenres(userGenres);
                setBackupGenres(userGenres);

                // set all genres
                const allGenresData = genresResponse.data.payload.map(genre => ({
                    value: String(genre.genreId),
                    label: genre.name
                }));
                setAllGenres(allGenresData);

                try {
                    // fetch reservations and theater images
                    const [currResResponse, allResResponse, theaterResponse] = await Promise.all([
                        axiosResInProgress(),
                        axiosResAll(),
                        axiosTheaters(),
                    ]);

                    // set current reservations
                    const currResData = currResResponse.data.payload.map(curr => ({
                            num: curr.reservationId,
                            date: curr.date,
                            startTime: curr.startTime,
                            endTime: curr.endTime,
                            room: curr.theaterName,
                            movie: curr.movieTitle,
                            name: curr.username,
                            mobile: curr.mobile,
                            id: curr.theaterId
                    }));
                    setCurrRes(currResData);

                    // set all reservations
                    const allResData = allResResponse.data.payload.map(all => ({
                        num: all.reservationId,
                        date: all.date,
                        startTime: all.startTime,
                        endTime: all.endTime,
                        room: all.theaterName,
                        movie: all.movieTitle,
                        id: all.theaterId
                    }));
                    const currNums = currResData.map(curr => curr.num);
                    // filter out current reservations to obtain past reservations
                    const filteredRes = allResData.filter(all => !currNums.includes(all.num));
                    setPastRes(filteredRes);

                    // set theater images
                    const theaterData = theaterResponse.data.payload.map(room => ({
                        id: room.theaterId,
                        img: room.image
                    }));
                    setTheaterImg(theaterData);
                } catch (resError) {
                    console.log('resError:', resError)
                }

            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setError("사용자 정보를 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyData();
    }, []);

    //conditional for current reservation
    const hasCurrRes = currRes.length > 0;
    const hasPastRes = pastRes.length > 0;

    // handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // handle password field changes
    const handlePasswordChange = (e) => {
        setIsPwEditMode(true);
        const { value } = e.target;
        setCurrentPassword(value);
    };

    // handle genre selection changes
    const handleGenreChange = (e) => {
        const { id, checked } = e.target;

        if (checked) {
            if (selectedGenres.length >= 3) {
                alert('선호하는 장르는 3개까지만 선택할 수 있습니다.');
                return;
            }
            setSelectedGenres(prev => [...prev, id]);
        } else {
            setSelectedGenres(prev => prev.filter(genre => genre !== id));

            // attach just-unselected ref
            justUnselectedRef.current = {
                id: id,
                mouseLeft: false
            };

            // reset hover state for just-unselected if hovered
            if (hoveredGenre === id) {
                setHoveredGenre(null);
            }
        }
    };

    // handle genre label mouse events
    const handleMouseEnter = (id) => {
        // clear unselected ref if re-entering after unselection
        if (justUnselectedRef.current.id === id && justUnselectedRef.current.mouseLeft) {
            justUnselectedRef.current = { id: null, mouseLeft: false };
        }
        setHoveredGenre(id);
    };

    const handleMouseLeave = (id) => {
        if (justUnselectedRef.current.id === id) {
            justUnselectedRef.current.mouseLeft = true;
        }
        setHoveredGenre(null);
    };

    // urghhhhhhh genre label styling based on state
    const getGenreLabelStyle = (id) => {
        if (selectedGenres.includes(id)) {
            return {
                backgroundColor: '#32271e',
                color: 'white',
                borderColor: '#32271e'
            };
        } else if (justUnselectedRef.current.id === id && !justUnselectedRef.current.mouseLeft) {
            return {
                backgroundColor: 'white',
                color: '#b2a69b',
                borderColor: '#b2a69b'
            };
        } else if (hoveredGenre === id) {
            return {
                backgroundColor: '#32271e',
                color: 'white',
                borderColor: '#32271e'
            };
        } else {
            return {
                backgroundColor: 'white',
                color: '#b2a69b',
                borderColor: '#b2a69b'
            };
        }
    };

    // const handleWriteReview = async (e) => {
    //     const { name } = e.target;
    //
    //
    // }

    // handle reservation cancellation
        const handleCancelRes = async (e) => {
            // setIsBtnActive(prev => !prev);

            const { name } = e.target;

            if (window.confirm("정말 예약을 취소하시겠습니까?")) {
                try {
                    await axiosResDel(name).then(delResponse => {
                        if(delResponse.status === 200) {
                            alert("상영관 예약이 취소되었습니다.");
                            window.location.reload();
                        }
                    })
                    .catch(error => {
                        alert('오류가 발생했습니다. 다시 시도해주세요.');
                        console.log(error.response.data.payload);
                    })
                } catch (delError) {
                    console.log(delError);
                }
            }
        }

    // validate form data
    const validateForm = () => {
        // check password validation if password was changed
        if (isPwEditMode) {
            if (!currentPassword.trim()) {
                alert('현재 비밀번호를 입력해주세요.');
                return false;
            }
            if (!newPassword.trim()) {
                alert('새로운 비밀번호를 입력해주세요.');
                return false;
            }
            if (newPassword !== confirmPassword) {
                alert('새로운 비밀번호가 일치하지 않습니다.');
                return false;
            }
        }

        // check genre selection
        if (selectedGenres.length !== 3) {
            alert('선호하는 장르 3개를 선택해주세요.');
            return false;
        }

        // email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email || '')) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return false;
        }

        return true;
    };

    // handle profile editing
    const handleEditProfile = async () => {

        // setTimeout(() => setBtnIsTouched(null), 100);
        setBtnIsTouched(null);

        if (!isEditMode) {
            // enter edit mode
            setIsEditMode(true);
            setBackupData({ ...formData });
            setBackupGenres([...selectedGenres]);
        } else { // aka. if not in edit mode,
            // validate and save changes
            if (!validateForm()) {
                return;
            }

            try {
                // update profile info
                const infoResponse = await axiosInfo(formData.email, formData.mobile);
                if (infoResponse.status !== 200) {
                    throw new Error(`Unexpected response status: ${infoResponse.status}`);
                }

                // update password if changed
                if (isPwEditMode) {
                    try {
                        const pwResponse = await axiosPassword(currentPassword, newPassword);
                        if (pwResponse.status !== 200) {
                            throw new Error('password update failed:', pwResponse.status);
                        }
                    } catch (pwError) {
                        if (pwError.response && pwError.response.status === 403) {
                            alert('현재 비밀번호가 틀렸습니다.');
                            return;
                        } else {
                            alert(pwError.response.data.payload || '비밀번호 변경 중 오류가 발생했습니다.');
                            return;
                        }
                    }
                }

                // update preferred genres
                const genreResponse = await axiosPreferredGenres(selectedGenres);
                if (genreResponse.status !== 200) {
                    throw new Error(`Genre update failed: ${genreResponse.status}`);
                }

                // success - exit edit mode and reset states
                setIsEditMode(false);
                setIsPwEditMode(false);
                setCurrentPassword('********');
                setNewPassword('');
                setConfirmPassword('');

                alert('회원정보가 성공적으로 수정되었습니다.');

            } catch (error) {
                console.error('Profile update error:', error);
                alert('회원정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    // handle edit cancellation
    const handleCancelEdit = () => {
        setFormData({ ...backupData });
        setSelectedGenres([...backupGenres]);
        setCurrentPassword('********');
        setNewPassword('');
        setConfirmPassword('');
        setIsEditMode(false);
        setIsPwEditMode(false);
    };

    // loading state
    if (isLoading) {
        return <div className={classes["loading"]}>로딩 중...</div>;
    }

    // error state
    if (error) {
        return <div className={classes["error"]}>{error}</div>;
    }

    return (
        <div className={classes["body"]}>
            <div className={classes["sectionWrap"]}>
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
                            <div className={classes["conBoxBar"]}>
                                <div className={classes["horLine"]}></div>
                                <div className={classes["barTitle"]}>MY RESERVATION</div>
                                <div className={classes["horLine"]}></div>
                            </div>

                            {hasCurrRes ?
                            currRes.map((reservation, index) => (
                                <div
                                    key={reservation.num}
                                    className={`${classes["currBox"]} ${index === currRes.length - 1 ? classes["marBotDel"] : ''}`}
                                >
                                    <div className={classes["currBoxLeft"]}>

                                        <div className={classes["currBoxTop"]}>
                                                    <div className={classes["num"]}>
                                                        예약번호&nbsp;<span style={{ color: '#b2a69b' }}>
                                                        {reservation.room.slice(0, 3)}{reservation.num}–
                                                        {reservation.date.slice(5, 7)}{reservation.date.slice(8, 10)}–
                                                        {reservation.startTime.slice(0, 2)}{reservation.startTime.slice(3, 5)}
                                                        </span>

                                                    </div>
                                                    <div className={classes["date"]}>
                                                        날짜&nbsp;<span style={{ color: '#b2a69b' }}>{new Date(reservation.date).toLocaleDateString("ko-Kr", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric"
                                                        })}</span>
                                                    </div>
                                                    <div className={classes["time"]}>
                                                        시간&nbsp;<span style={{ color: '#b2a69b' }}>{reservation.startTime.slice(0, 5)} – {reservation.endTime.slice(0,5)}</span>
                                                    </div>
                                                    <div className={classes["room"]}>
                                                        상영관&nbsp;<span style={{ color: '#b2a69b' }}>{reservation.room}</span>
                                                    </div>
                                                    <div className={classes["movie"]}>
                                                        영화&nbsp;<span style={{ color: '#b2a69b' }}>{reservation.movie}</span>
                                                    </div>
                                        </div>
                                        <div className={classes["currBoxBot"]}>
                                                    <div className={classes["name"]}>
                                                        예약자&nbsp;<span style={{ color: '#b2a69b' }}>{reservation.name}</span>
                                                    </div>
                                                    <div className={classes["mobile"]}>
                                                        전화번호&nbsp;<span style={{ color: '#b2a69b' }}>{reservation.mobile}</span>
                                                    </div>
                                        </div>
                                            <button
                                                name={reservation.num}
                                                key={reservation.num}
                                                type="button"
                                                className={`
                                                    ${classes["bigBtn"]} 
                                                    ${classes["cancelResBtn"]} 
                                                    ${btnIsTouched === reservation.num ? classes["cancelResTouched"] : classes["cancelResUntouched"]}
                                                    `}
                                                onClick={handleCancelRes}
                                                onTouchStart={() => setBtnIsTouched(reservation.num)}
                                                onTouchEnd={() => {
                                                    setTimeout(() => setBtnIsTouched(null), 100);
                                                }}
                                                // onMouseDown={() => setBtnIsTouched(reservation.num)}
                                                // onMouseUp={() => setBtnIsTouched(null)}
                                                // onMouseLeave={() => setBtnIsTouched(null)}
                                                // onTouchStart={() => handleTouchStart(reservation.num)}
                                                // onTouchEnd={handleTouchEnd}
                                            >
                                                CANCEL RESERVATION
                                            </button>
                                    </div>
                                    <div className={classes["currBoxRight"]}>
                                        {theaterImg
                                            .filter(img => img.id === reservation.id)
                                            .map((img) => (
                                                <div key={img.id}>
                                                    <img
                                                        src={img.img}
                                                        className={classes["pastImg"]}
                                                        alt="Theater Image"
                                                    />
                                                </div>
                                        ))}
                                    </div>
                                </div>
                            )) :
                            <div className={`${classes["currBox"]} ${classes["marBotDel"]}`}>
                                현재 예약된 내역이 없습니다.
                            </div>
                            }
                        </div>
                    </article>

                    {/* Right */}
                    <article className={classes["right"]}>
                        {/* Profile */}
                        <div className={`${classes["profileWrap"]} ${classes["contentBox"]}`}>
                            <div className={classes["conBoxBar"]}>
                                <div className={classes["horLine"]}></div>
                                <div className={classes["barTitle"]}>MY PROFILE</div>
                                <div className={classes["horLine"]}></div>
                            </div>

                            <div className={classes["userProfile"]}>
                                {/* User ID */}
                                <div className={classes["idWrap"]}>
                                    <div className={classes["formField"]}>
                                        <input
                                            type="text"
                                            id="username"
                                            value={formData.username || ''}
                                            readOnly
                                            placeholder=" "
                                            disabled={isEditMode}
                                            style={
                                                !isEditMode ? {pointerEvents: 'none'} : {}
                                            }
                                        />
                                        <label htmlFor="username">아이디</label>
                                    </div>
                                </div>

                                {/* Current Password */}
                                <div className={classes["formField"]}>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        value={currentPassword}
                                        onChange={handlePasswordChange}
                                        onKeyDown={(e) => {
                                            if (isEditMode && e.key === 'Enter') {
                                                handleEditProfile();
                                            }
                                        }}
                                        readOnly={!isEditMode}
                                        placeholder=" "
                                        style={
                                            !isEditMode ? {pointerEvents: 'none'} : {}
                                        }
                                    />
                                    <label htmlFor="currentPassword">
                                        {isPwEditMode ? "현재 비밀번호" : "비밀번호"}
                                    </label>
                                </div>

                                {/* New Password - only show when editing password */}
                                {isPwEditMode && (
                                    <>
                                        <div className={classes["formField"]}>
                                            <input
                                                type="password"
                                                id="newPassword"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (isEditMode && e.key === 'Enter') {
                                                        handleEditProfile();
                                                    }
                                                }}
                                                placeholder=" "
                                            />
                                            <label htmlFor="newPassword">새로운 비밀번호</label>
                                        </div>

                                        <div className={classes["formField"]}>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (isEditMode && e.key === 'Enter') {
                                                        handleEditProfile();
                                                    }
                                                }}
                                                placeholder=" "
                                            />
                                            <label htmlFor="confirmPassword">새로운 비밀번호 확인</label>
                                        </div>
                                    </>
                                )}

                                {/* Name */}
                                <div className={classes["formField"]}>
                                    <input
                                        type="text"
                                        id="realName"
                                        value={formData.realName || ''}
                                        readOnly
                                        placeholder=" "
                                        disabled={isEditMode}
                                        style={
                                            !isEditMode ? {pointerEvents: 'none'} : {}
                                        }
                                    />
                                    <label htmlFor="realName">이름</label>
                                </div>

                                {/* Mobile */}
                                <div className={classes["formField"]}>
                                    <input
                                        type="text"
                                        id="mobile"
                                        value={formData.mobile || ''}
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => {
                                            if (isEditMode && e.key === 'Enter') {
                                                handleEditProfile();
                                            }
                                        }}
                                        readOnly={!isEditMode}
                                        placeholder=" "
                                        style={
                                            !isEditMode ? {pointerEvents: 'none'} : {}
                                        }
                                    />
                                    <label htmlFor="mobile">전화번호</label>
                                </div>

                                {/* Email */}
                                <div className={classes["formField"]}>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email || ''}
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => {
                                            if (isEditMode && e.key === 'Enter') {
                                                handleEditProfile();
                                            }
                                        }}
                                        readOnly={!isEditMode}
                                        placeholder=" "
                                        style={
                                            !isEditMode ? {pointerEvents: 'none'} : {}
                                        }
                                    />
                                    <label htmlFor="email">이메일 주소</label>
                                </div>

                                {/* Genres */}
                                <div className={classes["genre"]}>
                                    <div className={classes["genreBar"]}>
                                        <div className={classes["genreTitle"]}>
                                            선호하는 장르 3개 선택해주세요
                                        </div>
                                        <div className={classes["horLine"]}></div>
                                    </div>

                                    <div className={classes["genreBox"]}>
                                        {(isEditMode ? allGenres : allGenres.filter(genre =>
                                            selectedGenres.includes(genre.value)
                                        )).map((genre) => (
                                            <div key={genre.value}>
                                                <input
                                                    type="checkbox"
                                                    name="chkGenre"
                                                    id={genre.value}
                                                    value={genre.value}
                                                    checked={selectedGenres.includes(genre.value)}
                                                    onChange={handleGenreChange}
                                                    disabled={!isEditMode}
                                                />
                                                <label
                                                    className={classes["genreChkBx"]}
                                                    htmlFor={genre.value}
                                                    style={{
                                                        ...getGenreLabelStyle(genre.value),
                                                        ...(isEditMode ? {cursor: 'pointer'} : {})
                                                    }}
                                                    onMouseEnter={() => handleMouseEnter(genre.value)}
                                                    onMouseLeave={() => handleMouseLeave(genre.value)}
                                                >
                                                    {genre.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <button
                                type="button"
                                key={"saveEditBtn"}
                                className={`
                                    ${classes["bigBtn"]} 
                                    ${classes["btn1"]}
                                    ${btnIsTouched === "saveEditBtn"? classes["editBtnTouched"] : classes["editBtnUntouched"]}

                                `}
                                onClick={handleEditProfile}
                                // onTouchStart={handleTouchStart}
                                // onTouchEnd={handleTouchEnd}
                                onTouchStart={() => setBtnIsTouched("saveEditBtn")}
                                // onTouchEnd={() => {
                                //     setTimeout(() => setBtnIsTouched(null), 100);
                                // }}
                                // style={{
                                //     backgroundColor: isTouched ? '#32271e' : '#b2a69b',
                                //     color: 'white',
                                // }}
                            >
                                {isEditMode ? 'SAVE EDIT' : 'EDIT PROFILE'}
                            </button>

                            {isEditMode && (
                                <button
                                    type="button"
                                    className={classes["cancelBtn"]}
                                    onClick={handleCancelEdit}
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={handleTouchEnd}
                                    style={{
                                        color: isTouched ? '#32271e' : '#b2a69b',
                                    }}
                                >
                                    CANCEL EDIT
                                </button>
                            )}
                        </div>

                        {/* Past Reservations */}
                        <div
                            className={`${classes["pastWrap"]} ${classes["contentBox"]} ${classes["wBg"]} ${classes["wMain"]}`}
                            style={ !hasPastRes ? {gap: '0'} : {} }
                        >
                            <div className={`${classes["conBoxBar"]} ${classes["wTitle"]}`}>
                                <div className={classes["horLine"]}></div>
                                <div className={`${classes["barTitle"]} ${classes["subtitle"]}`}>
                                    PAST RESERVATIONS
                                </div>
                                <div className={classes["horLine"]}></div>
                            </div>

                            { hasPastRes ?
                            pastRes.map((reservation, index) => (
                                <div
                                    key={reservation.num}
                                    className={`${classes["pastBox"]} ${
                                        index === pastRes.length - 1 ? classes["marBotDel"] : ''
                                    }`}
                                >
                                    <div className={classes["pastNum"]}>
                                        {reservation.room.slice(0, 3)}{reservation.num}–
                                        {reservation.date.slice(5, 7)}{reservation.date.slice(8, 10)}–
                                        {reservation.startTime.slice(0, 2)}{reservation.startTime.slice(3, 5)}
                                    </div>


                                    <div className={classes["pastBoxMain"]}>
                                        <div className={classes["pastBoxLeft"]}>
                                            <div className={classes["pastDate"]}>
                                                날짜&nbsp;<span style={{ color: '#b2a69b' }}>{new Date(reservation.date).toLocaleDateString("ko-Kr", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}</span>
                                            </div>
                                            <div className={classes["pastTime"]}>
                                                시간&nbsp;<span style={{ color: '#b2a69b' }}>{reservation.startTime.slice(0, 5)} – {reservation.endTime.slice(0, 5)}</span>
                                            </div>
                                            <div className={classes["pastRoom"]}>
                                                방&nbsp;<span style={{ color: '#b2a69b' }}>{reservation.room}</span>
                                            </div>
                                            <div className={classes["pastMovie"]}>
                                                영화&nbsp;<span
                                                    style={{
                                                        display: 'inline-block',
                                                        width: '75%',
                                                        color: '#b2a69b',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>{reservation.movie}</span>
                                            </div>
                                        </div>

                                        <div className={classes["pastBoxRight"]}>
                                            {theaterImg
                                                .filter(img => img.id === reservation.id)
                                                .map((img) => (
                                                    <div key={img.id}>
                                                        <img
                                                            src={img.img}
                                                            className={classes["pastImg"]}
                                                            alt="Theater Image"
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    <div className={classes["pastBoxBtn"]}>
                                        <button
                                            name={reservation.num}
                                            type="button"
                                            className={`${classes["bigBtn"]} ${classes["reviewBtn"]}`}
                                            onClick={() => setShowWriteForm(true)}
                                        >
                                            LEAVE REVIEW
                                        </button>
                                    </div>


                                </div>
                            )) :
                            <div className={"pastBox"}>
                                과거 예약 내역이 없습니다.
                            </div>
                            }
                        </div>
                    </article>
                </section>
            </div>

            { showWriteForm && (
                < WriteReview onClose={() => setShowWriteForm(false)} />
            )}
        </div>
    );
}

export default MyPage;