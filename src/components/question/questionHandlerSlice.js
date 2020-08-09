import { createSlice } from '@reduxjs/toolkit'

export const initialState = [
    {
        title: "Test question",
        options: ["First", "Last", "Both", "None"],
        correct: "First",
        questionId: 1,
        isAnswered: false,
        answer: '',
    },
    {
        title: "What is capitol city of Hungary?",
        options: ["Vienna", "London", "Paris", "Budapest"],
        correct: "Budapest",
        questionId: 2,
        isAnswered: false,
        answer: '',
    },
    {
        title: "What is capitol city of Mexico?",
        options: ["Whashington D.C", "Rio de Janeiro", "Ottawa", "Mexico City"],
        correct: "Mexico City",
        questionId: 3,
        isAnswered: false,
        answer: '',
    },
    {
        title: "What is capitol city of Italy?",
        options: ["Vatican", "Roma", "Paris", "San Marino"],
        correct: "Roma",
        questionId: 4,
        isAnswered: false,
        answer: '',
    },
    {
        title: "What is capitol city of Venezuela?",
        options: ["Sao Paolo", "Montevideo", "Caracas", "Bogotá"],
        correct: "Caracas",
        questionId: 5,
        isAnswered: false,
        answer: '',
    },
]

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
            console.log(questionIndex)
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