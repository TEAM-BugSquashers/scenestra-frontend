import classes from "./UserRegistration.module.css";
import {useState, useRef} from "react";
import {axiosChkUsername, axiosJoin} from "../api/axios.js";
import {useNavigate} from "react-router-dom";


function UserRegistration() {
    // state: form field
    const [formData, setFormData] = useState({
        id: '',
        pw: '',
        chkPw: '',
        name: '',
        mobile: '',
        email: ''
    });

    // state: genre selection
    const [selectedGenres, setSelectedGenres] = useState([]);

    // state: hovered genre selection
    const [hoveredGenre, setHoveredGenre] = useState(null);

    // genre that was just unselected
    const justUnselectedRef = useRef({
        id: null,
        mouseLeft: false
    });

    // all genres --- USE AXIOS FUNCTION
    const genres = [
        { id: 'family', label: '가족' },
        { id: 'performance', label: '공연' },
        { id: 'horror', label: '공포(호러)' },
        { id: 'drama', label: '드라마' },
        { id: 'mystery', label: '미스터리' },
        { id: 'crime', label: '범죄' },
        { id: 'thriller', label: '스릴러' },
        { id: 'animation', label: '애니메이션' },
        { id: 'action', label: '액션' },
        { id: 'comedy', label: '코미디' },
        { id: 'fantasy', label: '판타지' },
        { id: 'scifi', label: 'SF' }
    ];

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

            // genre marked as just unselected
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
    const getGenreLabelStyle = (id) => {
        if (selectedGenres.includes(id)) {
            // selected state
            return {
                backgroundColor: '#32271e',
                color: 'white',
                borderColor: '#32271e'
            };
        } else if (justUnselectedRef.current.id === id && !justUnselectedRef.current.mouseLeft) {
            // just unselected (mouse enter)
            return {
                backgroundColor: 'white',
                color: '#b2a69b',
                borderColor: '#b2a69b'
            };
        } else if (hoveredGenre === id) {
            // hover state
            return {
                backgroundColor: '#32271e',
                color: 'white',
                borderColor: '#32271e'
            };
        } else {
            // default state
            return {
                backgroundColor: 'white',
                color: '#b2a69b',
                borderColor: '#b2a69b'
            };
        }
    };

    const navigate = useNavigate();

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // requirement 1. three-genre selection
        if (selectedGenres.length !== 3) {
            alert('선호하는 장르 3개 선택해주세요');
            return;
        }

        // requirement 2. password/password-check agreement
        if (formData.pw !== formData.chkPw) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // form submission processed
        try {
            const response = await axiosJoin(
                formData.id,
                formData.pw,
                formData.email,
                formData.mobile,
                formData.name,
                selectedGenres
            );
            console.log(response);

            if (response.status === 201 || response.status === 200) {
                alert('회원가입에 성공했습니다');
                navigate('/login');
            } else {
                alert(`회원가입에 실패했습니다. 상태 코드: ${response.status}`);
            }
        } catch (error) {
            alert('회원가입 중 오류가 발생했습니다');
            console.log('error: ', error);
        }
    };

    // handle id duplication check
    const isIdFilled = formData.id.trim() !== '';

    const handleIdCheck = (e) => {
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


        // axiosChkUsername(formData.id).then(response => {

            // console.log(response);

        //     if (response.status === 200) {
        //         alert(`사용할 수 있는 아이디입니다.`)
        //     }
        // })
        //     .catch(error => {
        //         if (error.response && error.response.status === 400) {
        //             alert(`이미 사용 중인 아이디입니다.`);
        //             setFormData(prev => ({ ...prev, id: '' }));
        //         } else {
        //             alert(`오류가 발생했습니다. 다시 시도해주세요.`);
        //             console.error(error);
        //         }
        //     });
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

    return (
        <>
            <div className={classes["totalMargin"]}>
                <div className={classes["totalLeft"]}>
                    <div className={`${classes["leftQuote"]} ${classes["quoteLast"]}`}><em>SCENESTRA</em></div>
                    <div className={`${classes["leftQuote"]} `}>Scene and space, exclusively yours.</div>
                    {/*<div className={`${classes["leftQuote"]}`}>exclusively yours.</div>*/}
                </div>
                <div className={classes["totalMid"]}></div>
                <div className={classes["totalRight"]}>
                    <div className={`${classes["main"]} wBg wMain`}>
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
                                        {genres.map(genre => (
                                            <div key={genre.id} style={{ display: 'contents' }}>
                                                <input
                                                    type="checkbox"
                                                    name="chkGenre"
                                                    id={genre.id}
                                                    value={genre.id}
                                                    checked={selectedGenres.includes(genre.id)}
                                                    onChange={handleGenreChange}
                                                    disabled={
                                                        !selectedGenres.includes(genre.id) && selectedGenres.length >= 3
                                                    }
                                                />
                                                <label className={classes["genreChkBx"]}
                                                       htmlFor={genre.id}
                                                       style={getGenreLabelStyle(genre.id)}
                                                       onMouseEnter={() => handleMouseEnter(genre.id)}
                                                       onMouseLeave={() => handleMouseLeave(genre.id)}
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