import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch,user)=>{
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/user/login", user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}

export const AddFavourite_Movies = async (userId, movieId) => {
    const result = await userRequest.put(`/user/${userId}`, {"favourite_movies": movieId.toString()});
    console.log(result.data);
   // return result.data;
}

export const newUserRegister = async (user) => {
    const result = await publicRequest.post("/user/register", user);
    return result.data;  
}