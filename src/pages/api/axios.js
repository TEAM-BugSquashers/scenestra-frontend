import axios from "axios";

const instance = axios.create({
    baseURL: "/api",
    withCredentials: true,
    timeout: 15000
});

// 응답 인터셉터 추가
instance.interceptors.response.use(
    response => response, // 정상 응답은 그대로 반환
    error => {
        if ((window.location.href !== "/login") && error.response && error.response.status === 403) {
            // 403 에러 발생 시 로그인 페이지로 이동

            if (typeof window !== "undefined") {
                // alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
                window.location.href = "/login";
            }
        }
        // 다른 에러는 그대로 전파
        return Promise.reject(error);
    }
);

export const axiosTest = async () => {
    try {
        const response = await instance.get("");
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosLogin = async (username, password) => {
    try {
        const response = await instance.post("/login", {
            username,
            password,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosLogout = async () => {
    try {
        const response = await instance.post("/logout");
        return response;
    } catch (error) {
        throw error;
    }
}

// // 유저 api // //
export const axiosPreferredGenres = async ([x, y, z]) => {
    try {
        const response = await instance.put("/users/preferred-genres", [ x, y, z ]);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosPassword = async (oldPassword, newPassword) => {
    try {
        const response = await instance.put("/users/password", {
            oldPassword,
            newPassword
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosInfo = async (email, mobile) => {
    try {
        const response = await instance.put("/users/info", {
            email,
            mobile
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosJoin = async (username, password, email, mobile, realName, genres) => {
    try {
        const response = await instance.post("/users/join", {
            username,
            password,
            email,
            mobile,
            realName,
            genres
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosMe = async () => {
    try {
        const response = await instance.get
        ("/users/me");
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosChkUsername = async (username) => {
    try {
        const response = await instance.get("/users/check-username?username="+username);
        return response;
    } catch (error) {
        throw error;
    }
}


export const axiosgroupedByGenre = async () => {
    try {
        const response = await instance.get("/movies/grouped-by-genre");
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosGenres = async () => {
    try {
        const response = await instance.get("/movies/genres");
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosBindMovie = async (movieId) => {
    try {
        const response = await instance.get(`/movies/${movieId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosGenreId = async (genreId) => {
        const response = await instance.get(`/movies/genres/${genreId}`);
        return response;
}


export const axiosRecommend = async() => {
    try {
        const response = await instance.get("/movies/recommend");
        return response;
    } catch (error) {
        throw error;
    }
}
export const axiosTheaters = async () => {
    try {
        const response = await instance.get(`/theaters`);
        return response;
    }catch (error) {
        throw error;
    }
}

export const axiosTheaterDetails = async (theaterId) => {
    try {
        const response = await instance.get(`/theaters/${theaterId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosSearchMovies = async (title)=>{
    try {
        const response = await instance.get(`/movies/search?title=${title}`);
        return response;
    } catch (error) {
        throw error;
    }
}
