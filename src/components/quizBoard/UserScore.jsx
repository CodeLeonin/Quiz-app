import React from "react";
import { useSelector } from "react-redux";
import { Divider, List, ListItem, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  userScore: {
    backgroundColor: 'white',
    minWidth: "10%",
    maxHeight: "40%",
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '70px',
    right: '20px',
   },
   item: {
    textAlign: "center",
    fontSize: "16px"
  }
});

export default function QuizDrawer() {
  const classes = useStyles();
  const { playerName } = useSelector((state) => state.QuizBoard);
  const { score } = useSelector((state) => state.QuizBoard);
  const { currentQuestion } = useSelector((state) => state.QuizBoard);
  const questions = useSelector((state) => state.questions);
  console.log(playerName)

  return (
    <Grid className={classes.userScore} xs={3}>
      <List>
        <ListItem className={classes.item} >{playerName}</ListItem>
          <Divider />
        <ListItem className={classes.item}>Score: {score}</ListItem>
        <Divider />
        <ListItem 
        className={classes.item} 
        >
          From {questions.length} questions {currentQuestion} answered
        </ListItem>
      </List>
    </Grid>
  );
}

