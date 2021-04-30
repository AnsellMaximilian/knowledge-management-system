import { Button, makeStyles } from '@material-ui/core'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import LightBulbAndSwitch from '../components/LightBulbAndSwitch'
import UserContext from '../contexts/UserContext';
import urlFormatter from '../utils/urlFormatter';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            // justifyContent: 'center'
        }
    },

    title: {
        textAlign: 'left',
        margin: 0,
        width: 'min-content',
        fontSize: '3rem',
        lineHeight: 1.1
    },

    subTitle: {
        textAlign: 'left',
        margin: 0,
        color: theme.palette.text.secondary
    },

    callToAction: {
        textTransform: 'none',
        fontWeight: 'bold',
        marginTop: theme.spacing(3)
    },

    mainLeft: {
        textAlign: 'left'
    },

    mainRight: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}))

export default function Home() {

    const classes = useStyles();

    const user = useContext(UserContext);

    return (
        <div className={classes.container}>
            <div className={classes.mainLeft}>
                <h1 className={classes.title}>Knowledge Management System</h1>
                <h2 className={classes.subTitle}>Share Your Ideas</h2>
                {
                    user ?
                    <Link to={urlFormatter('/profile')}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.callToAction}
                        >Your Profile</Button>
                    </Link>
                    :
                    <Link to={urlFormatter('/signup')}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.callToAction}
                        >Create Account</Button>
                    </Link>
                }
            </div>
            <div className={classes.mainRight}>
                <LightBulbAndSwitch/>
            </div>
        </div>
    )
}
