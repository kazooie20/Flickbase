import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/users';
import articlesReducer from './reducers/articles';
import notificationReducer from './reducers/notifications';
import siteReducer from './reducers/site';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        articles: articlesReducer,
        notification: notificationReducer,
        site: siteReducer
    }
})





