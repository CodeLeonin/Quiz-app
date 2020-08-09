import React from 'react';
import { Grid } from '@material-ui/core';
import QuestionList from './QuestionList';
import BackButton from './BackButton';
import AddQuestion from './AddQuestion';

export default function QuestionHandler() {

    return(
       <Grid container direction="column" alignItems="flex-start">
           <Grid container justify="center" >
            <QuestionList />
            <AddQuestion />
            </Grid>
            <BackButton />
       </Grid>
   )
}