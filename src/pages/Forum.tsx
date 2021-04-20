import { Button, makeStyles } from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import React from 'react'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    createButton: {
        textTransform: 'none',
        fontWeight: 'bold',

    },

    createLink: {
        color: 'white',
        textDecoration: 'none',
        display: 'flex'
        
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

export default function Forum() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.header}>
                <h1>Forum</h1>
                <Button 
                    variant="contained" 
                    color="primary"
                    className={classes.createButton}
                >
                    <Link to="/forum/create" className={classes.createLink}>Create Article <Edit/></Link>
                    {/* Create Article <Edit/> */}
                </Button>
            </div>
            <div>

            </div>
        </div>
    )
}
