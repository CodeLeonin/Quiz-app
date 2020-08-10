import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { 
        Grid, 
        TextField, 
        FormControlLabel, 
        RadioGroup, 
        Radio, 
        Button, 
        Typography,
        FormHelperText,
        FormControl } from '@material-ui/core'
import { createQuestion } from './questionHandlerSlice';
import BackButton from './BackButton';

const useStyles = makeStyles({
    root: {
        alignItems: 'center',
        marginTop: '10px',
        backgroundColor: 'white',
        maxWidth: '75%',
    },
    title: {
        textAlign: 'center',
        margin: '20px',
    },
    textField: {
        alignContent: 'center',
    },
    questionField: {
        width: '100%',
        margin: '10px 10px',
    }
})

export default function AddQuestion() {
    const dispatch = useDispatch();
    const classes = useStyles();
    let [Question, setQuestion] = useState('');
    let [FirstOption, setFirstOption] = useState('');
    let [SecondOption, setSecondOption] = useState('');
    let [ThirdOption, setThirdOption] = useState('');
    let [FourthOption, setFourthOption] = useState('');
    let [Correct, setCorrect] = useState(undefined);
    let [errMsg, setErrMsg] = useState('');
    let [correctIsMissing, setCorrectIsMissing] = useState(false);
    let [correctIsMissingHelper, setCorrectIsMissingHelper] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!Question || !FirstOption || !SecondOption || !ThirdOption || !FourthOption
            ) {
                setErrMsg("Please fill all input fields");
                return;
            }
        if(!Correct){
                setCorrectIsMissing(true);
                setCorrectIsMissingHelper("Please choose an option");
                return
        }
        if (FirstOption === SecondOption || FirstOption === SecondOption || 
            FirstOption === ThirdOption || FirstOption === FourthOption || 
            SecondOption === ThirdOption || SecondOption === FourthOption ||
            ThirdOption === FourthOption) {
                setErrMsg("Options cant be same")
                return;
            }
        const newQuestion = {title: Question, 
                            options: [FirstOption, SecondOption, ThirdOption, FourthOption],
                            correct: Correct,
                            questionId: Math.ceil(Math.random() * 111) 
                        };
        dispatch(createQuestion(newQuestion));
        setQuestion('');
        setFirstOption('');
        setSecondOption('');
        setThirdOption('');
        setFourthOption('');
        setCorrect(undefined);
    }

    const handleSetCorrect = ( correctValue ) => {
        if( correctValue === '' || undefined ) {
            setErrMsg('Please fill Input fields!');
            return;
        } else {
            setCorrect(correctValue);
        }
    }

    return(
        <Grid className={ classes.root }
            container
            direction="column"
            alignItems="center"
            >
            <Typography 
                variant="h5" 
                color="primary" 
                className={ classes.title}> 
                New question
            </Typography>
            <Grid container 
                className={ classes.textField } direction="column" alignItems="center" xs="12">
                <Grid item >
                    <TextField
                        className={classes.questionField}
                        error
                        helperText={errMsg}
                        size='small'
                        type="text" 
                        placeholder="Question" 
                        variant='filled'
                        value={Question}
                        onChange={(e) => setQuestion(e.target.value)} 
                        required />
                </Grid>
                <FormControl component="fieldset" error={correctIsMissing}>
                    <RadioGroup aria-label="correct" value={Correct}>
                        <div>
                            <FormControlLabel 
                                value={FirstOption}
                                control={<Radio checked={ Correct === FirstOption}/>} 
                                onClick={() => handleSetCorrect(FirstOption)}/>
                            <TextField
                                error
                                helperText={errMsg}
                                type="text" 
                                placeholder=" first Option"
                                value={FirstOption}
                                onChange={(e) => setFirstOption(e.target.value)}
                                required />
                        </div>
                        <div >
                            <FormControlLabel 
                                value={SecondOption}
                                control={<Radio checked={ Correct === SecondOption} />} 
                                onClick={() => handleSetCorrect(SecondOption)}/>
                            <TextField
                                error
                                helperText={errMsg}
                                type="text" 
                                placeholder="second option" 
                                value={SecondOption}
                                onChange={(e) => setSecondOption(e.target.value)}
                                required/>
                        </div>
                        <div >
                            <FormControlLabel 
                                value={ThirdOption}
                                control={<Radio checked={ Correct === ThirdOption} />} 
                                onClick={() => handleSetCorrect(ThirdOption)}/>
                            <TextField
                                error
                                helperText={errMsg}
                                type="text" 
                                placeholder="third option" 
                                value={ThirdOption}
                                onChange={(e) => setThirdOption(e.target.value)}
                                required/>
                        </div>
                        <div >
                            <FormControlLabel 
                                value={FourthOption} 
                                control={<Radio checked={ Correct === FourthOption} />} 
                                onClick={() => handleSetCorrect(FourthOption)}/>
                            <TextField
                                error
                                helperText={errMsg}
                                type="text" 
                                placeholder="fourth option"
                                value={FourthOption}
                                onChange={(e) => setFourthOption(e.target.value)}
                                required/>
                        </div>
                    </RadioGroup>
                    <FormHelperText>{correctIsMissingHelper}</FormHelperText>
                </FormControl>
                <Grid container justify="space-around">
                    <BackButton />
                    <Button 
                        color="primary" 
                        variant="contained"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}