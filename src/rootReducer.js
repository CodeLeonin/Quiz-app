import { combineReducers } from 'redux';
import quizBoardReducer from './components/quizBoard/quizBoardSlice';
import questionHandlerReducer from './components/question/questionHandlerSlice';

const rootReducer = combineReducers({
    QuizBoard: quizBoardReducer,
    questions: questionHandlerReducer,
})

export default rootReducer;