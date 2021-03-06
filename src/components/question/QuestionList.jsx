import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, Card, CardContent, Typography, ListItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteQuestion } from './questionHandlerSlice';

const useStyles = makeStyles(() => ({
    root: {
        justifyContent: 'flex-start',
        overflow: 'auto',
        backgroundColor: "grey",
        marginTop: '20px',
        minWidth: '100%',
        maxWidth: '100%',
        minHeight: '330px',
        maxHeight: '330px',
    },
    card: {
        minWidth: '33.33%',
        maxWidth: '20%',
        minHeight: '100%',
        maxHeight: '20%',
        textAlign: 'center'
    },
    listItem:{
        textAlign: 'center',
        borderRadius: '10px',
        margin:' 10px 10px',
    }
}))

export default function QuestionList() {
    const dispatch = useDispatch();
    const questions = useSelector( state => state.questions );
    const classes = useStyles();

    return(
        <Grid container className={classes.root} xs={12}>  
            {questions && questions.map((question) => 
                <Card variant="outlined" className={classes.card}>
                    <CardContent>
                        <Typography variant="h5">
                            {question.title}
                        </Typography>
                        <Typography color="textSecondary">
                            {question.options.map( option => 
                            <ListItem 
                                key={question.options.indexOf(option)}
                                className={classes.listItem}
                                style={{backgroundColor: 
                                    question.correct === option ? 'lightgreen' : 'red'}}
                            >{option}</ListItem>)}
                        </Typography>
                        <DeleteIcon 
                        color="secondary" 
                        onClick={() => dispatch(deleteQuestion(question.questionId))}/>
                    </CardContent>
                </Card>
            )}
        </Grid> 
    )
}