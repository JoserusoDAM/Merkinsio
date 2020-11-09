import { combineReducers } from 'redux'
import commentsReducer from './comments'
import postsReducer from './posts'
import postReducer from './post'

const rootReducer = combineReducers({
    posts: postsReducer,
    comments: commentsReducer,
    post: postReducer,
})

export default rootReducer