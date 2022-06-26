import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../slices/category/categorySlices';
import userReducer from '../slices/users/usersSlices';
import postReducer from '../slices/posts/postSlices';
import commentReducer from '../slices/comments/commentSlices';
import SendEmailReducer from '../slices/email/emailSlices';
import accVerificationReducer from '../slices/accountVerification/accVerificationSlices';

const store = configureStore({
    reducer: {
        users: userReducer,
        category: categoryReducer,
        posts: postReducer,
        comment: commentReducer,
        sendMail: SendEmailReducer,
        accountVerification: accVerificationReducer
    }
});

export default store;