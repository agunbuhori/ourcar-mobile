import React from "react";
import http from "../http/http"
import { Response } from "../../interfaces/Response"
import { useDispatch } from "react-redux"
import {getBrand, getModel, getType, getUniqueId} from 'react-native-device-info';
import firebase from "@react-native-firebase/app"

const useAuthService = () => {
    const dispatch = useDispatch()
    const [device, setDevice] = React.useState({
        brand: "",
        type: "",
        uid: "",
        fcm_token: ""
    })

    const getDeviceInfo = async () => {
        const brand = getBrand()
        const type = getModel()
        const uid = await getUniqueId()

        const fcm_token = await firebase.app().messaging().getToken()

        setDevice(prev => ({
            ...prev,
            brand,
            type,
            uid,
            fcm_token
        }))
    }

    React.useEffect(() => {
        getDeviceInfo()
    }, [])

    const signIn = async (email: string, password: string) : Promise<any> => {
        try {
            const auth = await http.post<Response<Auth>>('/auth/signin', {
                email,
                password,
                ...device
            })
    
            if (auth.data.data.token) {
                dispatch({type: 'LOGIN', payload: {isAuthenticated: true, token: auth.data.data.token}})
                return true
            }
    
            return false
        } catch (error) {
            // console.log(error.response.data)
            return false
        }
    }

    const signOut = async () => {
        try {
            const auth = await http.post('/auth/signout', {...device})
            dispatch({type: 'LOGOUT'})
            return auth
        } catch (error) {
            console.error(error)
        }
    }

    const user = async (): Promise<User | boolean> => {
        try {
            const currentUser = await http.get<Response<User>>('/auth/user')

            if (currentUser.data.data.id) {
                return currentUser.data.data
            }

            return false
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const updateProfile = async (data: any) => {
        try {
            const updating = await http.put(`/auth/update-profile`, data)

            if (updating.data) {
                return updating.data
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    const updateAccount = async (data: any) => {
        try {
            const updating = await http.put(`/auth/update-account`, data)

            if (updating.data) {
                return updating.data
            }
        } catch (error) {
            console.error(error)
        }
    }


    return {
        signIn,
        signOut,
        user,
        updateProfile,
        updateAccount
    }
}

export default useAuthService