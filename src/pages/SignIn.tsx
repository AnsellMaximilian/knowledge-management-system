import { Button, Container, makeStyles, Paper, TextField } from '@material-ui/core'
import React, {useState} from 'react'

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        // padding: theme.spacing(0, 3, 3, 3)
    },

    title: {
        margin: theme.spacing(0)
    },

    submitButton: {
        marginTop: theme.spacing(2)
    },

    container: {
        padding: theme.spacing(3, 3, 3, 3)
    }
}))

export default function SignUp() {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} className={classes.container}>
                <h1 className={classes.title}>Sign Up</h1>
                <form className={classes.form}>
                    <TextField 
                        variant="outlined" 
                        margin="normal" 
                        label="Full Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField 
                        variant="outlined" 
                        margin="normal" 
                        label="Bio"
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                    />
                    <TextField 
                        variant="outlined" 
                        margin="normal" 
                        type="email" 
                        label="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField 
                        variant="outlined" 
                        margin="normal" 
                        type="password" 
                        label="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" className={classes.submitButton}>Sign Up</Button>
                </form>
            </Paper>
        </Container>
    )
}
