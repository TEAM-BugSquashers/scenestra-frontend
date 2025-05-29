import classes from "./UserRegistration.module.css";
import {useState, useRef, useEffect} from "react";
import {axiosChkUsername, axiosGenres, axiosJoin} from "../api/axios.js";
import {useNavigate} from "react-router-dom";


function UserRegistration() {
    // states
    const [formData, setFormData] = useState({
        id: '',
        pw: '',
        chkPw: '',
        name: '',
        mobile: '',
        email: ''
    });
    const [allGenres, setAllGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [hoveredGenre, setHoveredGenre] = useState(null);
    const [isTouched, setIsTouched] = useState(false);

    // loading/error states
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // just-unselected genre ref
    const justUnselectedRef = useRef({
        id: null,
        mouseLeft: false
    });

    // left image state
    const [currentIndex, setCurrentIndex] = useState(0);

    // left image array
    const imageClasses = [
        'imgEight',
        'imgThree',
        'imgFive',
        'imgSeven',
        'imgNine',
        'imgEleven',
        'imgOne',
        'imgEight',
        'imgThree',
        'imgFive',
        'imgSeven',
        'imgNine',
        'imgEleven',
        'imgOne',
        'imgEight',
        'imgThree',
        'imgFive',
        'imgSeven',
        'imgNine',
        'imgEleven',
        'imgOne',
        'imgEight'
    ]

    // left image transition
    useEffect(() => {
        if (currentIndex < imageClasses.length - 1) {
            // const time = (currentIndex + 0.1) * 100;
            const logBase = (number, base) => Math.log(number) / Math.log(base);
            const time = logBase(5, (currentIndex+3)*0.4) * 110;
            // const time = Math.log(currentIndex) * 100;
            // const time = Math.pow(1.5, currentIndex) * 100;
            const timeout = setTimeout(() => {
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, time);
            return () => clearTimeout(timeout);
        }

    }, [currentIndex, imageClasses.length]);

    const getImageStyle = (index) => {
        return {
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 700 : 700 - ((index + 1) * 10)
        }
    }

    // load all genres
    useEffect(() => {
        const fetchAllGenres = async () => {
            try {
                setIsLoading(true);
                setError(null);
                // setLoaded(true);

                // set all genres
                const genresResponse = await axiosGenres();
                const allGenresData = genresResponse.data.payload.map(genre => ({
                    value: String(genre.genreId),
                    label: genre.name
                }));
                setAllGenres(allGenresData);
            } catch (error) {
                console.error("Failed to fetch genre selection:", error);
                setError("장르 정보를 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllGenres();
    }, []);

    // handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // handle genre selection changes
    const handleGenreChange = (e) => {
        const { id, checked } = e.target;

        if (checked) {
            if (selectedGenres.length >= 3) {
                alert('선호하는 장르는 3개까지만 선택할 수 있습니다.');
                return;
            }
            setSelectedGenres([...selectedGenres, id]);
        } else {
            // if unchecked, genre is removed from selected
            setSelectedGenres(selectedGenres.filter(genre => genre !== id));

            // attach just-unselected ref
            justUnselectedRef.current = {
                id: id,
                mouseLeft: false
            };

            // hover state is reset (aka. after unselection, even if hovered, genre label turns white)
            if (hoveredGenre === id) {
                setHoveredGenre(null);
            }
        }
    };
    // handle genre label mouse enter
    const handleMouseEnter = (id) => {
        // if re-entry after unselection, 'unselected flag' is cleared
        if (justUnselectedRef.current.id === id && justUnselectedRef.current.mouseLeft) {
            justUnselectedRef.current = { id: null, mouseLeft: false };
        }
        // hover state updated
        setHoveredGenre(id);
    };

    // house genre label mouse leave
    const handleMouseLeave = (id) => {
        if (justUnselectedRef.current.id === id) {
            justUnselectedRef.current.mouseLeft = true;
        }
        setHoveredGenre(null);
    };

    // genre label color change
    const handleTouchStart = () => {
        setIsTouched(true);
    }
    const handleTouchEnd = () => {
        setIsTouched(false);
    }
    const getGenreLabelStyle = (id) => {
        if (selectedGenres.includes(id)) {
            // selected state
            return {
                backgroundColor: '#32271e',
                color: 'white',
                borderColor: '#32271e'
            };
        } else if (justUnselectedRef.current.id === id && !justUnselectedRef.current.mouseLeft) {
            // just unselected (but mouse still enter)
            return {
                backgroundColor: 'white',
                color: '#b2a69b',
                borderColor: '#b2a69b'
            };
        } else if (hoveredGenre === id) {
            if (selectedGenres.length === 3 && !isTouched) {
                return {
                            backgroundColor: 'white',
                            color: '#b2a69b',
                            borderColor: '#b2a69b'
                        }
            } else {
                return {
                    backgroundColor: '#32271e',
                    color: 'white',
                    borderColor: '#32271e'
                };
            }
        } else {
            // default state
            return {
                backgroundColor: 'white',
                color: '#b2a69b',
                borderColor: '#b2a69b'
            };
        }
    };

    // validate form data
    const validateForm = () => {
        if (formData.pw !== formData.chkPw) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }

        if (selectedGenres.length !== 3) {
            alert('선호하는 장르 3개를 선택해부세요.');
            return false;
        }

        // email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email || '')) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return false;
        }

        return true;
    }

    // handle form submit
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate
        if (!validateForm()) {
            return;
        }

        try {
            const userResponse = await axiosJoin(
                formData.id,
                formData.pw,
                formData.email,
                formData.mobile,
                formData.name,
                selectedGenres
            );

            console.log(userResponse);

            if (userResponse.status === 201 || userResponse.status === 200) {
                alert('회원가입에 성공했습니다.');
                navigate('/login');
            } else {
                console.log('Failed to register user:', userResponse.status)
                alert('회원가입에 실패했습니다.')
            }
        } catch (error) {
            if (error.response.data.payload !== undefined) {
                console.log('register error:', error.response.data.payload);
                alert(error.response.data.payload);
            } else {
                alert("회원가입 중 오류가 발생했습니다.");
            }
        }
    };

    // handle id duplication check
    const isIdFilled = formData.id.trim() !== '';

    const handleIdCheck = async (e) => {
        e.preventDefault();

        // prevent empty id field
        if (!formData.id || formData.id.trim() === '') {
            alert('아이디를 입력해주세요.');
            return;
        }

        // id minimum length
        if (formData.id.length < 1) {
            alert('아이디는 최소 1글자 이상 입력해주세요.');
            return;
        }

        try {
            await axiosChkUsername(formData.id).then(idResponse => {
                if (idResponse.status === 200) {
                    alert('사용할 수 있는 아이디입니다.')
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    alert('이미 사용 중인 아이디입니다.');
                    setFormData(prev => ({ ...prev, id: ''}));
                } else {
                    alert('오류가 발생했습니다. 다시 시도해주세요.');

                    console.log(error.response.data.payload);
                }
            })
        } catch (idError) {
            console.log(idError);
        }
    };

    const isFormComplete = () => {
        return (
            formData.id.trim() &&
            formData.pw.trim() &&
            formData.chkPw.trim() &&
            formData.name.trim() &&
            formData.mobile.trim() &&
            formData.email.trim() &&
            selectedGenres.length === 3
        );
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
        <>
            <div className={classes["totalMargin"]}>
                <div className={classes["totalLeft"]}>
                    <div className={classes["leftBox"]}>
                        <img
                            src="./img/8.jpeg"
                            alt=""
                            className={classes["imgEight"]}
                            style={getImageStyle(0)}
                        />
                        <img
                            src="./img/3.jpg"
                            alt=""
                            className={classes["imgThree"]}
                            style={getImageStyle(1)}
                        />
                        <img
                            src="./img/5.jpg"
                            alt=""
                            className={classes["imgFive"]}
                            style={getImageStyle(2)}
                        />
                        <img
                            src="./img/7.jpg"
                            alt=""
                            className={classes["imgSeven"]}
                            style={getImageStyle(3)}
                        />
                        <img
                            src="./img/9.jpeg"
                            alt=""
                            className={classes["imgNine"]}
                            style={getImageStyle(4)}
                        />
                        <img
                            src="./img/11.jpg"
                            alt=""
                            className={classes["imgEleven"]}
                            style={getImageStyle(5)}
                        />
                        <img
                            src="./img/1.jpg"
                            alt=""
                            className={classes["imgOne"]}
                            style={getImageStyle(6)}
                        />
                        <img
                            src="./img/8.jpeg"
                            alt=""
                            className={classes["imgEight"]}
                            style={getImageStyle(7)}
                        />
                        <img
                            src="./img/3.jpg"
                            alt=""
                            className={classes["imgThree"]}
                            style={getImageStyle(8)}
                        />
                        <img
                            src="./img/5.jpg"
                            alt=""
                            className={classes["imgFive"]}
                            style={getImageStyle(9)}
                        />
                        <img
                            src="./img/7.jpg"
                            alt=""
                            className={classes["imgSeven"]}
                            style={getImageStyle(10)}
                        />
                        <img
                            src="./img/9.jpeg"
                            alt=""
                            className={classes["imgNine"]}
                            style={getImageStyle(11)}
                        />
                        <img
                            src="./img/11.jpg"
                            alt=""
                            className={classes["imgEleven"]}
                            style={getImageStyle(12)}
                        />
                        <img
                            src="./img/1.jpg"
                            alt=""
                            className={classes["imgOne"]}
                            style={getImageStyle(13)}
                        />                        <img
                        src="./img/8.jpeg"
                        alt=""
                        className={classes["imgEight"]}
                        style={getImageStyle(7)}
                    />
                        <img
                            src="./img/3.jpg"
                            alt=""
                            className={classes["imgThree"]}
                            style={getImageStyle(8)}
                        />
                        <img
                            src="./img/5.jpg"
                            alt=""
                            className={classes["imgFive"]}
                            style={getImageStyle(9)}
                        />
                        <img
                            src="./img/7.jpg"
                            alt=""
                            className={classes["imgSeven"]}
                            style={getImageStyle(10)}
                        />
                        <img
                            src="./img/9.jpeg"
                            alt=""
                            className={classes["imgNine"]}
                            style={getImageStyle(11)}
                        />
                        <img
                            src="./img/11.jpg"
                            alt=""
                            className={classes["imgEleven"]}
                            style={getImageStyle(12)}
                        />
                        <img
                            src="./img/1.jpg"
                            alt=""
                            className={classes["imgOne"]}
                            style={getImageStyle(13)}
                        />
                        <img
                            src={"./img/8.jpg"}
                            alt=""
                            className={classes["empty"]}
                            style={getImageStyle(14)}
                        />

                        <div className={classes["leftQuoteBox"]}>
                            <div className={`${classes["leftQuote"]} ${classes["leftLogo"]}`}><em>SCENESTRA</em></div>
                            <div className={`${classes["leftQuote"]} `}>Scene and space, exclusively yours.</div>
                        </div>

                    </div>
                </div>
                <div
                    className={classes["totalMid"]}
                ></div>
                <div className={classes["totalRight"]}>
                    <div
                        className={`${classes["main"]} wBg wMain`}
                    >
                        <section className={classes["topBar"]}>
                            <div className={`${classes["horLine"]} bBg`}></div>
                            <div className={classes["barTitle"]}>SIGN UP</div>
                            <div className={`${classes["horLine"]} bBg`}></div>
                        </section>

                        <form onSubmit={handleSubmit}>
                            <section className={classes["userInfo"]}>
                                {/* 아이디 */}
                                <div className={classes["idWrap"]}>
                                    <div className={classes["formField"]}>
                                        <input
                                            type="text"
                                            id="id"
                                            minLength="1"
                                            maxLength="50"
                                            value={formData.id}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            autoComplete="new-password"
                                            autoCorrect="off"
                                            required
                                        />
                                        <label htmlFor="id" className={classes["wSec"]}>아이디</label>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleIdCheck}
                                        className={isIdFilled ? classes["valid"] : classes[""]}
                                        disabled={!isIdFilled}
                                    >아이디<br/>중복 확인</button>
                                </div>

                                {/* 비번 */}
                                <div className={classes["formField"]}>
                                    <input
                                        type="password"
                                        id="pw"
                                        minLength="8"
                                        maxLength="50"
                                        value={formData.pw}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        autoComplete="new-password"
                                        autoCorrect="off"
                                        required
                                    />
                                    <label htmlFor="pw">비밀번호</label>
                                </div>

                                {/* 비번확인 */}
                                <div className={classes["formField"]}>
                                    <input
                                        type="password"
                                        id="chkPw"
                                        minLength="8"
                                        maxLength="50"
                                        value={formData.chkPw}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="chkPw">비밀번호 확인</label>
                                </div>

                                {/* 이름 */}
                                <div className={classes["formField"]}>
                                    <input
                                        type="text"
                                        id="name"
                                        minLength="1"
                                        maxLength="50"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="name">이름</label>
                                </div>

                                {/* 전번 */}
                                <div className={classes["formField"]}>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        minLength="1"
                                        maxLength="50"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        placeholder="예: 010-1234-5678"
                                        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                                        required
                                    />
                                    <label className={classes["mobileLbl"]} htmlFor="mobile">전화번호</label>
                                </div>

                                {/* 이메일 */}
                                <div className={classes["formField"]}>
                                    <input
                                        type="email"
                                        id="email"
                                        minLength="1"
                                        maxLength="50"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="email">이메일 주소</label>
                                </div>

                                {/* 장르 */}
                                <div className={classes["genre"]}>
                                    <div className={classes["genreBar"]}>
                                        <div className={classes["genreTitle"]}>선호하는 장르 3개 선택해주세요</div>
                                        <div className={`${classes["horLine"]} bBg`}></div>
                                    </div>
                                    <div className={classes["genreBox"]}>
                                        {allGenres.map(genre => (
                                            <div key={genre.value} style={{ display: 'contents' }}>
                                                <input
                                                    type="checkbox"
                                                    name="chkGenre"
                                                    id={genre.value}
                                                    value={genre.value}
                                                    checked={selectedGenres.includes(genre.value)}
                                                    onChange={handleGenreChange}
                                                    onTouchStart={handleTouchStart}
                                                    onTouchEnd={handleTouchEnd}
                                                />
                                                <label className={classes["genreChkBx"]}
                                                       htmlFor={genre.value}
                                                       style={getGenreLabelStyle(genre.value)}
                                                       onMouseEnter={() => handleMouseEnter(genre.value)}
                                                       onMouseLeave={() => handleMouseLeave(genre.value)}
                                                >
                                                    {genre.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                            <button
                                type="submit"
                                className={isFormComplete() ? classes["valid"] : classes[""]}
                                disabled={!isFormComplete()}
                            >SUBMIT</button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}

export default UserRegistration