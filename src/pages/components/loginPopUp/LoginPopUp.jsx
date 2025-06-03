import classes from './LoginPopUp.module.css';
import {axiosFindId, axiosFindPw} from "../../api/axios.js";
import {useState} from "react";

function LoginPopUp({ onClose }) {
    //states
    const [idFormData, setIdFormData] = useState({
        idName: '',
        email: ''
    })
    const [pwFormData, setPwFormData] = useState({
        pwName: '',
        username: ''
    })

    // handle close when backdrop is clicked
    const handleClose = () => {
        onClose();
    }

    // handle input changes
    const handleIdInputChange = (e) => {
        const { id, value } = e.target;
        setIdFormData( (prevState) => ({ ...prevState, [id]: value }));
    }

    const handlePwInputChange = (e) => {
        const { id, value } = e.target;
        setPwFormData((prevState) => ({ ...prevState, [id]: value }));
    }

    // handle submits
    const handleIdSubmit = async (e) => {
        e.preventDefault();

        try {
            const idResponse = await axiosFindId(idFormData.email, idFormData.idName);
            alert(`회원님의 아이디는 '${idResponse.data.payload}' 입니다.`);
        } catch (error) {
            alert(error.response.data.payload);
        }
    }

    const handlePwSubmit = async (e) => {
        e.preventDefault();

        try {
            const pwResponse = await axiosFindPw(pwFormData.username, pwFormData.pwName);
            alert(pwResponse.data.payload);

        } catch (error) {
            alert(error.response.data.payload);
            console.log(error);
        }
    };

    // handle submit button color change
    const isIdFormComplete = () => {
        return (
            idFormData.idName.trim() &&
            idFormData.email.trim()
        );
    };
    const isPwFormComplete = () => {
        return (
            pwFormData.pwName.trim() &&
            pwFormData.username.trim()
        );
    };

    return (
        <>
            <div className={classes["backdrop"]} onClick={handleClose}>
                <div className={classes["popUpWrap"]} onClick={(e) => e.stopPropagation()}>
                    {/* close X */}
                    <div className={classes["XBox"]} onClick={(e) => {
                        e.stopPropagation();
                        handleClose()}}>
                        <div className={classes["XBox2"]} onClick={(e) => e.stopPropagtion()}>
                            <div className={classes["XLeft"]}></div>
                            <div className={classes["XRight"]}></div>
                        </div>
                    </div>

                    {/*find my id*/}
                    <div className={classes["idBox"]}>
                        <div className={classes["boxBar"]}>
                            <div className={classes["horLine"]}></div>
                            <div className={classes["barTitle"]}>FIND MY ID</div>
                            <div className={classes["horLine"]}></div>
                        </div>

                        <form onSubmit={handleIdSubmit}>
                            {/*name*/}
                            <div className={classes["formField"]}>
                                <input
                                    type="text"
                                    id="idName"
                                    minLength="1"
                                    maxLength="50"
                                    value={idFormData.idName}
                                    onChange={handleIdInputChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="name">이름</label>
                            </div>

                            {/*email*/}
                            <div className={classes["formField"]}>
                                <input
                                    type="email"
                                    id="email"
                                    minLength="1"
                                    maxLength="50"
                                    value={idFormData.email}
                                    onChange={handleIdInputChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="email">이메일 주소</label>
                            </div>

                            <button
                                type="submit"
                                className={isIdFormComplete() ? classes["valid"] : classes[""]}
                                disabled={!isIdFormComplete()}
                            >SUBMIT</button>
                        </form>
                    </div>

                    {/* vertical line */}
                    <div className={classes["vertLine"]}></div>

                    {/*find my pw*/}
                    <div className={classes["pwBox"]}>
                        <div className={classes["boxBar"]}>
                            <div className={classes["horLine"]}></div>
                            <div className={classes["barTitle"]}>FIND MY PASSWORD</div>
                            <div className={classes["horLine"]}></div>
                        </div>

                        <form onSubmit={handlePwSubmit}>
                            {/*name*/}
                            <div className={classes["formField"]}>
                                <input
                                    type="text"
                                    id="pwName"
                                    minLength="1"
                                    maxLength="50"
                                    value={pwFormData.pwName}
                                    onChange={handlePwInputChange}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="name">이름</label>
                            </div>

                            {/*id*/}
                            <div className={classes["formField"]}>
                                <input
                                    type="text"
                                    id="username"
                                    minLength="1"
                                    maxLength="50"
                                    value={pwFormData.username}
                                    onChange={handlePwInputChange}
                                    placeholder=" "
                                    autoComplete="new-password"
                                    autoCorrect="off"
                                    required
                                />
                                <label htmlFor="id" className={classes["wSec"]}>아이디</label>
                            </div>

                            <button
                                type="submit"
                                className={isPwFormComplete() ? classes["valid"] : classes[""]}
                                disabled={!isPwFormComplete()}
                            >SUBMIT</button>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPopUp