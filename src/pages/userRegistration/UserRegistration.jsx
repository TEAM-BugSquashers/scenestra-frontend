import classes from "./UserRegistration.module.css";
import {useState, useRef} from "react";
import {axiosChkUsername} from "../api/axios.js";


function UserRegistration() {
    // State for form fields
    const [formData, setFormData] = useState({
        id: '',
        pw: '',
        chkPw: '',
        name: '',
        mobile: '',
        email: ''
    });

    // State for checkbox selections
    const [selectedGenres, setSelectedGenres] = useState([]);

    // State for tracking hovered checkbox
    const [hoveredGenre, setHoveredGenre] = useState(null);

    // Track if a genre was just unselected
    const justUnselectedRef = useRef({
        id: null,
        mouseLeft: false
    });



    // Available genres
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

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Handle checkbox changes
    const handleGenreChange = (e) => {
        const { id, checked } = e.target;

        if (checked) {
            // Don't allow more than 3 selections
            if (selectedGenres.length >= 3) {
                alert('선호하는 장르는 3개까지만 선택할 수 있습니다.');
                return; // Ignore new selection if already 3 are selected
            }
            setSelectedGenres([...selectedGenres, id]);
        } else {
            // Remove from selected if unchecked
            setSelectedGenres(selectedGenres.filter(genre => genre !== id));

            // Mark this genre as just unselected
            justUnselectedRef.current = {
                id: id,
                mouseLeft: false
            };

            // Reset hover state to force the label to turn white
            if (hoveredGenre === id) {
                setHoveredGenre(null);
            }
        }
    };

    // Handle mouse enter on genre label
    const handleMouseEnter = (id) => {
        // If this is a re-entry after unselecting, clear the unselected flag
        if (justUnselectedRef.current.id === id && justUnselectedRef.current.mouseLeft) {
            justUnselectedRef.current = { id: null, mouseLeft: false };
        }

        // Update hover state
        setHoveredGenre(id);
    };

    // Handle mouse leave on genre label
    const handleMouseLeave = (id) => {
        // Track that mouse has left the just unselected item
        if (justUnselectedRef.current.id === id) {
            justUnselectedRef.current.mouseLeft = true;
        }

        setHoveredGenre(null);
    };

    // Get style for genre label
    const getGenreLabelStyle = (id) => {
        if (selectedGenres.includes(id)) {
            // Selected state - dark background
            return {
                backgroundColor: '#32271e',
                color: 'white',
                borderColor: '#32271e'
            };
        } else if (justUnselectedRef.current.id === id && !justUnselectedRef.current.mouseLeft) {
            // Just unselected with mouse still on it - force white
            return {
                backgroundColor: 'white',
                color: '#b2a69b',
                borderColor: '#b2a69b'
            };
        } else if (hoveredGenre === id) {
            // Hover state - dark background
            return {
                backgroundColor: '#32271e',
                color: 'white',
                borderColor: '#32271e'
            };
        } else {
            // Default state - white background
            return {
                backgroundColor: 'white',
                color: '#b2a69b',
                borderColor: '#b2a69b'
            };
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if exactly 3 genres are selected
        if (selectedGenres.length !== 3) {
            alert('선호하는 장르 3개 선택해주세요');
            return;
        }

        // Process form submission
        console.log('Form submitted:', { ...formData, genres: selectedGenres });
        // You would typically send this data to your backend here
    };

    // Handle ID duplication check
    // const handleIdCheck = (e) => {
    //     e.preventDefault();
    //     console.log('Checking ID:', formData.id);
    //     // In a real application, this would call an API to check ID availability
    //     alert('ID 확인 기능은 아직 구현되지 않았습니다.');
    // };

    // Handle ID duplication check
    const handleIdCheck = (e) => {
        e.preventDefault();

        axiosChkUsername(formData.id).then(response => {
            if (response.status === 200) {
                alert(`사용할 수 있는 아이디입니다.`)
            }
        })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    alert(`이미 사용 중인 아이디입니다.`);
                    setFormData(prev => ({ ...prev, id: '' }));
                } else {
                    alert(`오류가 발생했습니다. 다시 시도해주세요.`);
                    console.error(error);
                }
            });
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
                                            required
                                        />
                                        <label htmlFor="id" className={classes["wSec"]}>아이디</label>
                                    </div>
                                    <button onClick={handleIdCheck}>아이디<br/>중복 확인</button>
                                </div>

                                {/* 비번 */}
                                <div className={classes["formField"]}>
                                    <input
                                        type="password"
                                        id="pw"
                                        minLength="1"
                                        maxLength="50"
                                        value={formData.pw}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="pw">비밀번호</label>
                                </div>

                                {/* 비번확인 */}
                                <div className={classes["formField"]}>
                                    <input
                                        type="password"
                                        id="chkPw"
                                        minLength="1"
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
                                        type="text"
                                        id="mobile"
                                        minLength="1"
                                        maxLength="50"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="mobile">전화번호</label>
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
                            <button type="submit">SUBMIT</button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}

export default UserRegistration