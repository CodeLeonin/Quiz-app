import React from 'react';
import QuizBoard from './components/quizBoard/QuizBoard';
import { Container, Grid } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import QuestionHandler from './components/question/QuestionHandler';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'orange',
    minHeight: '100vh',
  },
})

function App() {
  const classes = useStyles();
  return(
    <BrowserRouter>
      <div className="App">
        <Container maxWidth="xl" className={classes.root}>
        <CssBaseline />
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Route exact path='/' component={QuizBoard} />
            <Route path="/questionHandler" component={QuestionHandler} />
          </Grid>
        </Container>
      </div>
    </BrowserRouter>
    );
}
export default App;
