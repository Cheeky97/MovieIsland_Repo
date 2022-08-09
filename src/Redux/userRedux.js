import {createSlice} from "@reduxjs/toolkit"

const userRedux = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state)=>{
            state.isFetching = true;
        },
        loginSuccess: (state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
        }, 
        loginFailure: (state)=>{
            state.isFetching = false;
            state.error = true;
        },
        logoutUser: (state) =>{
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
            state.favourites = null;
        },
        addFavouriteMovieId: (state, action) => {
            state.currentUser.favourite_movies = action.payload;
        },
    }
})

export const { loginStart, loginSuccess, loginFailure, logoutUser, addFavouriteMovieId } = userRedux.actions;

export default userRedux.reducer;