import axios from "axios";

let requestQueue = Promise.resolve();
const originalInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,
    timeout: 15000
});

originalInstance.interceptors.response.use(
    response => response,
    error => {
        // 403 에러 발생 시 로그인 페이지로 이동
        if ((window.location.href !== "/login") && error.response && error.response.status === 403) {
            if (typeof window !== "undefined") {
                // alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
                window.location.href = "/login";
            }
        }
        // 다른 에러는 그대로 전파
        return Promise.reject(error);
    }
);

// 원본 인스턴스의 메서드들을 래핑하여 순차 처리
const createSequentialMethod = (method) => {
    return function (...args) {
        return new Promise((resolve, reject) => {
            requestQueue = requestQueue
                .then(async () => {
                    try {
                        // 원본 axios 메서드 호출
                        const response = await originalInstance[method](...args);

                        // 요청 간 간격
                        await new Promise(r => setTimeout(r, 10));

                        resolve(response);
                    } catch (error) {
                        // 에러는 originalInstance의 인터셉터에서 이미 처리됨
                        reject(error);
                    }
                })
                .catch(() => {
                    // 이전 요청 실패해도 현재 요청은 진행
                    reject(new Error('Queue processing failed'));
                });
        });
    };
};

// 순차 처리를 위한 instance 생성
const instance = {
    get: createSequentialMethod('get'),
    post: createSequentialMethod('post'),
    put: createSequentialMethod('put'),
    delete: createSequentialMethod('delete'),
    patch: createSequentialMethod('patch')
};

export const axiosTest = async () => {
    return await instance.get("");
}

export const axiosLogin = async (username, password) => {
    return await instance.post("/login", {
        username,
        password,
    });
}

export const axiosLogout = async () => {
    return await instance.post("/logout");
}

// // 상영관 api // //
export const axiosTheaters = async () => {
    return await instance.get("/theaters");
}

// // 예약 API // //
export const axiosResDel = async (reservationId) => {
    return await instance.delete("reservations/" + reservationId);
}

export const axiosResInProgress = async () => {
    return await instance.get("/reservations/my/in-progress");
}

export const axiosResAll = async () => {
    return await instance.get("/reservations/my/all");
}

// // 유저 api // //
export const axiosPreferredGenres = async ([x, y, z]) => {
    return await instance.put("/users/preferred-genres", [x, y, z]);
}

export const axiosPassword = async (oldPassword, newPassword) => {
    return await instance.put("/users/password", {
        oldPassword,
        newPassword
    });
}

export const axiosInfo = async (email, mobile) => {
    return await instance.put("/users/info", {
        email,
        mobile
    });
}

export const axiosJoin = async (username, password, email, mobile, realName, genres) => {
    return await instance.post("/users/join", {
        username,
        password,
        email,
        mobile,
        realName,
        genres
    });
}

export const axiosMe = async () => {
    return await instance.get("/users/me");
}

export const axiosFindPw = async (username, name) => {
    try {
        const response = await instance.get("/users/findPw?username="+username+"&name="+name);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosFindId = async (email, name) => {
    try {
        const response = await instance.get("/users/findId?email="+email+"&name="+name);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosChkUsername = async (username) => {
    return await instance.get("/users/check-username?username=" + username);
}

export const axiosgroupedByGenre = async () => {
    return await instance.get("/movies/grouped-by-genre");
}

export const axiosGenres = async () => {
    return await instance.get("/movies/genres");
}

export const axiosBindMovie = async (movieId) => {
    return await instance.get(`/movies/${movieId}`);
}

export const axiosGenreId = async (genreId) => {
    return await instance.get(`/movies/genres/${genreId}`);
}

export const axiosRecommend = async () => {
    return await instance.get("/movies/recommend");
}

export const axiosRoom = async () => {
    return await instance.get("/theaters");
}

export const axiosTheaterDetails = async (theaterId) => {
    return await instance.get(`/theaters/${theaterId}`);
}

export const axiosCapacity = async (num) => {  // num 파라미터 추가
    return await instance.get(`/theaters/capacity?num=${num}`);  // 쿼리 파라미터로 전달
}

export const axiosSearchMovies = async (title) => {
    return await instance.get(`/movies/search?title=${title}`);
}

export const axiosAvailableDates = async (theaterId, movieId, yearMonth) => {
    return await instance.get("/reservations/available-dates", {
        params: {
            theaterId: theaterId,
            movieId: movieId,
            yearMonth: yearMonth
        }
    });
}

export const axiosTheaterReviews = async (theaterId) => {
    return await instance.get(`/reviews/theater/${theaterId}`);
}

export const axiosAvailableTimes = async (theaterId, movieId, date) => {
    return await instance.get("/reservations/available-times", {
        params: {
            theaterId: theaterId,
            movieId: movieId,
            day: date
        }
    });
}

export const axiosReservation = async (reservationData) => {
    return await instance.post("/reservations", reservationData);
}

export const axiosOneReview = async (id) => {
    return await instance.get(`/movies/${id}`);
}

export const axiosWriteReview = async (reviewData) => {
    return await instance.post('/reviews', reviewData);
}

export const axiosReviewPopups = async (id) => {
    return await instance.get(`/reviews/${id}`);
}

export const axiosViewALlReservation = async () => {
    return await instance.get("/admin/reservations");
}

export const axiosViewReservationDeteails = async (reservationId) => {
    return await instance.get(`/admin/reservations/${reservationId}`);
}



