import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import LightBulbAndSwitch from '../components/LightBulbAndSwitch'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
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
    }
}))

export default function Home() {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.mainLeft}>
                <h1 className={classes.title}>Knowledge Management System</h1>
                <h2 className={classes.subTitle}>Share Your Ideas</h2>
                <Button variant="contained" color="primary" className={classes.callToAction}>Create Account</Button>
            </div>
            <div>
                <LightBulbAndSwitch/>
            </div>
        </div>
    )
}
