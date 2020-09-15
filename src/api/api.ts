import axios from "axios";
import {profileType} from "../types/types";


let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '7d54e03a-c727-4a11-92e7-335f41a4e836'
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    changeUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    }
};

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    Captcha = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {userId: number}
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => {
                return response.data;
            })
    },

    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data);
    },

    logout() {
        return instance.delete(`auth/login`);
    }
};

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
            .then(response => {
                return response.data
            })
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: profileType) {
        return instance.put('profile', profile)
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
};