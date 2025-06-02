import axios from "axios";

let requestQueue = Promise.resolve();
let queueCount = 0;

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
    return function(...args) {
        return new Promise((resolve, reject) => {
            queueCount++;
            const url = args[0] || '';
            // console.log(`📝 요청 대기열 추가: ${method.toUpperCase()} ${url} (현재 대기열: ${queueCount}개)`);

            requestQueue = requestQueue
                .then(async () => {
                    // console.log(`⏳ 요청 처리 중: ${method.toUpperCase()} ${url}`);

                    try {
                        // 원본 axios 메서드 호출
                        const response = await originalInstance[method](...args);

                        queueCount--;
                        // console.log(`✅ 요청 처리 완료: ${method.toUpperCase()} ${url} (남은 대기열: ${queueCount}개)`);

                        // 요청 간 간격
                        await new Promise(r => setTimeout(r, 10));

                        resolve(response);
                    } catch (error) {
                        queueCount--;
                        // console.log(`❌ 요청 처리 실패: ${method.toUpperCase()} ${url} (남은 대기열: ${queueCount}개)`);

                        // 에러는 originalInstance의 인터셉터에서 이미 처리됨
                        reject(error);
                    }
                })
                .catch(() => {
                    // 이전 요청 실패해도 현재 요청은 진행
                    queueCount--;
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

// // 상영관 api // //
export const axiosTheaters = async () => {
    try {
        const response = await instance.get("/theaters");
        return response;
    } catch (error) {
        throw error;
    }
}

// // 예약 API // //
export const axiosResDel = async (reservationId) => {
    try {
        const response = await instance.delete("reservations/"+reservationId);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosResInProgress = async () => {
    try {
        const response = await instance.get("/reservations/my/in-progress");
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosResAll = async () => {
    try {
        const response = await instance.get("/reservations/my/all");
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
        const response = await instance.get("/users/me");
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

export const axiosTheaterReviews = async (theaterId)=>{
    try {
        const response = await instance.get(`/review/theater/${theaterId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosOneReview = async (id)=>{
    try {
        const response = await instance.get(`/movies/${id}`);
        return response;
    }catch (error) {
        throw error;
    }
}

export const axiosWriteReview = async (reviewData) => {
    try {
        const response = await instance.post('/review', reviewData);
        return response;
    } catch (error) {
        console.log('Error status:', error.response?.status);
        console.log('Error message:', error.response?.data);
        console.log('Request data:', reviewData);
        throw error;
    }
}

export const axiosReviewPopups = async (id) => {
    try {
        const response = await instance.get(`/review/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosViewALlReservation = async () =>{
    try {
        const response = await instance.get("/admin/reservations");
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosViewReservationDeteails = async (reservationId) =>{
    try {
        const response = await instance.get(`/admin/reservations/${reservationId}`);
        return response;
    }catch(error){
        throw error;
    }
}



