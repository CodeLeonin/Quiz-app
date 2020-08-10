import React from "react";
import { useState } from 'react';
import Quiz from "./Quiz";
import { useDispatch, useSelector } from "react-redux";
import { startQuiz, setStartMode } from './quizBoardSlice';
import QuestionHandlerButton from './QuestionHandlerButton'
import { 
        Typography, 
        Button, 
        Grid, 
        TextField, 
        Modal, 
        Backdrop, 
        Fade, 
        } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: "white",
      padding: "25px 50px 75px 100px",
    },
    introText: {
        marginTop: "100px",
    },
    modalContent: {
        justifyContent: "center",
        margin: "20px 20px 40px 20px",
    },
    buttons: {
        marginTop: '50px',
        padding: '50px',
        borderRadius: '13px',
        backgroundColor: 'white',
    },
    root: {
        minWidth: "100px",
        backgroundColor: 'lightgrey',
    },
    intro: {
        textAlign: "justify"
    }
  }));

export default function QuizBoard() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [errMessage, setErrMessage] = useState("");
    const [playerName, setPlayerName] = useState('');
    const [openModal, setopenModal] = useState(false);
    const questions = useSelector( state => state.questions );
    const { startMode } = useSelector( state => state.QuizBoard)
    
    const openModalWindow = () => {
        if( questions.length === 0) {
            setErrMessage("There are no question in the quiz!");
            return;
        }
        setopenModal(true);
    }

    const modalBody = (
        <Grid 
            container
            justify="center"
            >
            <Typography 
                variant="h5"
                color="primary"
                style={{padding: "30px"}}
                >Your playername is</Typography>
            <Grid container alignItems="stretch" direction="column" className={classes.modalContent} >
                <TextField
                    error
                    helperText={errMessage}
                    type="text" 
                    placeholder="Name" 
                    variant="filled"
                    value={playerName} 
                    onChange={(e) => setPlayerName(e.target.value)}
                    />
               
            </Grid>
             <Button 
                variant="contained"
                color="primary"
                onClick={() => handleStartQuiz()}> Start Quiz</Button>
          </Grid>
    )

    const handleStartQuiz = () => {
       
        if( !playerName ) {
            setErrMessage("Name is required");
            return;
        }
        if( questions.length === 0) {
            setErrMessage("Quiz is empty")
        }
        setopenModal(false);
        dispatch(startQuiz(playerName))
        dispatch(setStartMode(true));
    }
    
    return(
        <Grid container>
            {startMode ? 
                <Quiz />
            :
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        container
                        justify="center"
                        xs={9}
                        className={classes.introText}
                    >
                        <Typography 
                            variant="h4" 
                        >
                            Welcome to my Quiz App
                        </Typography>
                        <Typography variant="h6" className={classes.introText}>
                            This app was created with react and redux.
                            You can start quiz by pressing start
                            quiz button. If the quiz is empty you cant start it. 
                            You need to give a username to start quiz.
                        </Typography>
                    </Grid>
                   
                    <Grid 
                        container
                        justify="space-evenly"
                        className={classes.buttons}
                        xs={6}
                        >
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => openModalWindow()}>Start Quiz</Button>
                        <span>{errMessage}</span>
                       <QuestionHandlerButton />
                    </Grid>
                </Grid>
            }
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={() => setopenModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div className={classes.paper}>
                         {modalBody}
                    </div>
                </Fade>
            </Modal>
        </Grid>
    )
}