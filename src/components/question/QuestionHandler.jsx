import React from 'react';
import { Grid } from '@material-ui/core';
import QuestionList from './QuestionList';
import AddQuestion from './AddQuestion';

export default function QuestionHandler() {

    return(
       <Grid container direction="column" alignItems="flex-start" xs={12} >
           <Grid container justify="center" >
            <QuestionList />
            <AddQuestion />
            </Grid>
       </Grid>
   )
}