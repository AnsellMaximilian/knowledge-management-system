import { Container, makeStyles } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        padding: theme.spacing(2)
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    navList: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',
        display: 'flex',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        margin: theme.spacing(0,1)
    },
    activeLink: {
        fontWeight: 'bold'
    }
}))

export default function Header() {
    const classes = useStyles();

    return (
        <header className={classes.header}>
            <Container maxWidth="md">
                <nav className={classes.nav}>
                    <ul className={classes.navList}>
                        <li><NavLink exact to={`${process.env.PUBLIC_URL + '/'}`} className={classes.link} activeClassName={classes.activeLink}>Home</NavLink></li>
                        <li><NavLink to={`${process.env.PUBLIC_URL + '/forum'}`} className={classes.link} activeClassName={classes.activeLink}>Forum</NavLink></li>
                        <li><NavLink to={`${process.env.PUBLIC_URL + '/repsitory'}`} className={classes.link} activeClassName={classes.activeLink}>Repository</NavLink></li>
                    </ul>
                    <ul className={classes.navList}>
                        <li><NavLink to={`${process.env.PUBLIC_URL + '/signin'}`} className={classes.link} activeClassName={classes.activeLink}>Sign In</NavLink></li>
                        <li><NavLink to={`${process.env.PUBLIC_URL + '/signup'}`} className={classes.link} activeClassName={classes.activeLink}>Sign Up</NavLink></li>
                    </ul>
                </nav>
            </Container>
        </header>
    )
}
