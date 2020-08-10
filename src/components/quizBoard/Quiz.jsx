import React from 'react';
import Question from "./Question";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, Grid, Card, CardContent } from '@material-ui/core';
import { nextQuestion, previousQuestion, setStartMode } from './quizBoardSlice';
import { resetQuestions } from '../question/questionHandlerSlice';
import UserScore from './UserScore';

const useStyles = makeStyles ({
    questionCard: {
        marginTop: '20px',
        minWidth: '50%',
        minHeight: '350px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    questionNavigation: {
        marginTop: '50px',
        padding: '50px',
        borderRadius: '13px',
        backgroundColor: 'white',
    },
    finish: {
        textAlign: 'center',
    },
    finishButton:{
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default function Quiz() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const questions = useSelector( state => state.questions );
    const { currentQuestion, score } = useSelector( state => state.QuizBoard );

    const nextQuestionHandler = () => {
        if( currentQuestion < questions.length) {
            dispatch(nextQuestion())
        }
    }

    const previousQuetionHandler = () => {
        console.log(currentQuestion !== 0)
        if( currentQuestion !== 0) {
            dispatch(previousQuestion())
        }
    }
    const endQuiz = () => {
        resetQuestions();
        dispatch(setStartMode(false));
    }

    return(
        <Grid 
            container
            direction="column"
            justify="space-evenly"
            alignItems="center" 
        >
            <UserScore />
            {currentQuestion < questions.length ? 
                <Grid container alignItems="stretch">
                    { <Question question = {questions[currentQuestion]} />}
                </Grid>
                :
                <Card variant="outlined" className={classes.questionCard}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h4" className={classes.finish}>
                            You have finished the quiz
                        </Typography>
                        <Typography variant="h6" className={classes.finish}>
                            Your score is
                        </Typography>
                        <Typography variant="h6" color="secondary" className={classes.finish}>
                           { score } / { questions.length}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => endQuiz()}
                            className={classes.finishButton}
                        >
                            End Quiz
                        </Button>
                    </CardContent>
                </Card>
            }
            <Grid 
                className={ classes.questionNavigation }
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                >
                <Button 
                    variant="contained"
                    color="secondary"
                    onClick= {() => previousQuetionHandler()}>
                    Previous
                </Button>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick= {() => nextQuestionHandler()}>
                    Next
                </Button>
            </Grid>
        </Grid>
    )
}