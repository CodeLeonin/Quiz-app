import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core'

const BackButton = withRouter(({ history }) => (
  <Button
    color="secondary"
    variant="contained"
    onClick={() => { history.push(`/`) }}
  >
    Back
  </Button>
))

export default BackButton;