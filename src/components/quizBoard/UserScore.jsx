import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, List, ListItem, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
   userScore: {
        backgroundColor: 'white',
        minWidth: "20%",
        minHeight: "20%",
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        position: 'absolute',
        top: '70px',
        right: '40px',
   },
   playername: {
       textAlign: 'center',
       fontSize: '16px',
   },

})

export default function QuizDrawer() {
    const classes = useStyles();
    const { playerName } = useSelector( state => state.QuizBoard );
    const { score } = useSelector( state => state.QuizBoard );
    const { currentQuestion } = useSelector( state => state.QuizBoard)
    const questions = useSelector( state => state.questions)

    return(
        <Grid
            className={classes.userScore}
            >
            <List>
                <ListItem className={classes.playername}>
                    { playerName }
                </ListItem>
                <Divider />
                <ListItem className={classes.playername}>
                    Score:
                </ListItem>
                <ListItem className={classes.playername}>
                    { score }
                </ListItem>
                <Divider />
                <ListItem>
                   From { questions.length} questions { currentQuestion } answered
                </ListItem>
            </List>
        </Grid>
    )
} 