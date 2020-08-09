import React from "react";
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { increaseScore } from './quizBoardSlice';
import { answerQuestion } from '../question/questionHandlerSlice';
import {
        Typography, 
        List, 
        ListItem, 
        ListItemText, 
        Button, 
        Grid, 
        Card,
        CardContent } from '@material-ui/core';

const useStyle = makeStyles({
    questionCard: {
        minWidth: '50%',
        minHeight: '50%',
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        alignText: 'center',
    },
    optionList: {
        flexDirection: 'column',
        justify: 'space-evenly',
        alignItems: 'stretch',
    }
})

export default function Questions({question}) {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState("");
    const [errMessage, setErrMessage] = useState("");

    const handleAnswer = () => {
        if( !selectedOption ){
            setErrMessage("You have to choose at least one");
            return;
        }
        const answerParams = {selectedOption: selectedOption, id: question.questionId }
        dispatch(answerQuestion(answerParams))

        if(selectedOption === question.correct){    
            dispatch(increaseScore());
        }
    }

    return(
       <Grid container justify="center" xs={12} >
           <Card variant="outlined" className={classes.questionCard}>
               <CardContent>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                    >
                        <Typography 
                            variant="h6" 
                            className={classes.title}
                            color="primary"
                        >
                            {question.title}
                        </Typography>
                    </Grid>
                    <List className={classes.optionList}>
                        {question.options && question.isAnswered ? 
                            question.options.map(option => {return(
                                <ListItem key={question.options.indexOf(option)}>
                                    <Button
                                        disabled
                                        value={option}
                                        variant="outlined"
                                        style=
                                        {{
                                        backgroundColor: 
                                            question.correct === option ? 
                                                "lightgreen" : "#ff7747",
                                        alignItems: "stretch",
                                        width: "300px"
                                        }}
                                        >
                                            <ListItemText 
                                                primary={option} 
                                                style={{ textColor: "white", textAlign: 'center' }}
                                            />
                                    </Button>
                                </ListItem>
                            )}
                        )
                        : 
                        question.options.map(option => {return(
                            <ListItem key={question.options.indexOf(option)}>
                                <Button
                                    value={option}
                                    variant="outlined"
                                    onClick={() => setSelectedOption(option)}
                                    style=
                                    {{backgroundColor: 
                                        selectedOption === option ? "lightblue" : "white",
                                        display: "flex",
                                        width: "300px"
                                    }}
                                    >
                                        <ListItemText primary={option} />
                                </Button>
                            </ListItem>
                            )}
                        )}
                    </List>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                    >
                        { !question.isAnswered && 
                            <Button 
                                variant="contained"
                                color="primary"
                                onClick={() => handleAnswer(selectedOption)}
                            >
                                Send Answer
                            </Button>
                        }
                    </Grid>
                    {!errMessage ? "" : <Typography>{errMessage}</Typography>}
                </CardContent>
            </Card>
        </Grid>
    )
}