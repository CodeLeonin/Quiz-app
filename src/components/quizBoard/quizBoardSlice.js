import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    playerName: "",
    currentQuestion: 0,
    score: 0,
    isAnswered: false,
    answerAndQuestion: [],
}

const quizBoardSlice = createSlice({
    name: 'quizBoard',
    initialState,
    reducers: {
        startQuiz(state, action) {
           state.playerName = action.payload
        },
        nextQuestion(state) {
            state.currentQuestion++
        },
        previousQuestion(state) {
            state.currentQuestion--
        },
        increaseScore(state) {
            state.score++
        },
    }
})

export const {  startQuiz, 
                nextQuestion, 
                previousQuestion, 
                increaseScore, 
            } = quizBoardSlice.actions

export default quizBoardSlice.reducer