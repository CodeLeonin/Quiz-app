import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core'

const QuestionHandlerButton = withRouter(({ history }) => (
  <Button
    color="secondary"
    variant="contained"
    onClick={() => { history.push(`/questionHandler`) }}
  >
    Quiz Handler
  </Button>
))

export default QuestionHandlerButton;