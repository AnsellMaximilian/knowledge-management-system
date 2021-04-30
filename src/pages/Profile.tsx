import { Button, makeStyles, Paper } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React, { useContext } from 'react'
import UserContext from '../contexts/UserContext'

const useStyles = makeStyles(theme => ({
    details: {
        padding: theme.spacing(3),
    },
    container: {
        textAlign: 'left'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    editButton: {
        textTransform: 'none',
        fontWeight: 'bold',
    },

    detailsSection: {
        borderBottom: `2px solid ${theme.palette.divider}`,
        paddingBottom: theme.spacing(1)
    },
    detailsSectionTitle: {
        margin: 0
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
                    <div className={classes.header}>
                        <h1>{user.name}</h1>
                        <Button 
                            variant="contained" 
                            color="primary"
                            className={classes.editButton}
                        >
                            Edit Profile <Edit/>
                        </Button>
                    </div>
                    <Paper className={classes.details}>
                        <div className={classes.detailsSection}>
                            <h2 className={classes.detailsSectionTitle}>Bio</h2>
                            <div>{user.bio}</div>
                        </div>
                    </Paper>
                </div>
            }
        </div>
    )
}
