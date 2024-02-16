import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../ReduxFeature/UserSlice'
export default configureStore({
    reducer:{
        user:userReducer
    },
});