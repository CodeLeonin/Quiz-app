import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    playerName: "",
    currentQuestion: 0,
    score: 0,
    startMode: false,
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
        setStartMode(state, action) {
            state.startMode = action.payload
        }
    }
})

export const {  startQuiz, 
                nextQuestion, 
                previousQuestion, 
                increaseScore,
                setStartMode,
            } = quizBoardSlice.actions

export default quizBoardSlice.reducer