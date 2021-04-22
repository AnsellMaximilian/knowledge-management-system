import { makeStyles, Paper } from '@material-ui/core';
import React, { useContext } from 'react'
import UserContext from '../contexts/UserContext'

const useStyles = makeStyles(theme => ({
    details: {
        padding: theme.spacing(3),
        
    },

    container: {
        textAlign: 'left'
    }
}))

export default function Profile() {
    const user = useContext(UserContext);

    const classes = useStyles()

    return (
        <div>
            {
                user &&
                <div className={classes.container}>
                    <h1>{user.name}</h1>
                    <Paper className={classes.details}>
                        {user.bio}
                    </Paper>
                </div>
            }
        </div>
    )
}
