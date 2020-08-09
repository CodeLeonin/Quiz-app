import { createSlice } from '@reduxjs/toolkit'

export const initialState = []

const questionHandlerSlice = createSlice({
    name: 'questionHandler',
    initialState,
    reducers: {
        createQuestion(state, action) {
            const { title, options, correct, questionId } = action.payload
            const isAnswered = false
            state.push({ title, options, correct, questionId, isAnswered })
        },
        deleteQuestion(state, action) {
            return state.filter(question => question.questionId !== action.payload)
        },
        answerQuestion(state, action) {
            const { selectedOption, id }  = action.payload
            const questionIndex = state
                .findIndex( ({questionId}) => questionId === id)
            state[questionIndex].isAnswered = true
            state[questionIndex].answer = selectedOption
        },
        resetQuestions(state) {
            state.questions.map(question => question.isAnswered = false)
            state.questions.map(question => question.answer = '')
        }
    }
})

export const { createQuestion, deleteQuestion, answerQuestion, resetQuestions } = questionHandlerSlice.actions

export default questionHandlerSlice.reducer