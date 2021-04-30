import { Button, makeStyles, Paper, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import UserContext from '../contexts/UserContext';
import { db } from '../utils/firebase';
import urlFormatter from '../utils/urlFormatter';

const useStyles = makeStyles(theme => ({
    container: {
        textAlign: 'left',
        // marginTop: theme.spacing(3)
    },

    formContainer: {
        padding: theme.spacing(3)
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
    },

    title: {
        margin: 0
    },

    saveButton: {
        alignSelf: 'flex-end',
        marginTop: theme.spacing(2)
    }
}))

export default function EditProfile() {

    const classes = useStyles();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const user = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if(user){
            setName(user.name);
            setBio(user.bio || '');
        }
    }, [user])

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if(user){
            db.collection('userProfiles').doc(user.uid).update({
                name,
                bio
            }).then(() => history.push(urlFormatter('/profile')))
            
        }
    }

    return (
        <div className={classes.container}>
            <Paper elevation={3} className={classes.formContainer}>
                <h1 className={classes.title}>Edit Your Profile</h1>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                         variant="outlined" 
                         margin="normal" 
                         label="Full Name"
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                         variant="outlined" 
                         margin="normal" 
                         label="Bio"
                         multiline
                         value={bio}
                         onChange={(e) => setBio(e.target.value)}
                    />
                    <Button
                        className={classes.saveButton}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Save Changes
                    </Button>
                </form>
            </Paper>
        </div>
    )
}
