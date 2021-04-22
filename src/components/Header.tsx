import { Container, makeStyles, Popover } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons';
import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../contexts/UserContext';
import { auth } from '../utils/firebase';

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
    },

    accountMenuButton: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },

    accountMenu: {
        padding: theme.spacing(2),
        '& $link': {
            color: theme.palette.text.primary,
            cursor: 'pointer'
        }
    }
}))

export default function Header() {
    const classes = useStyles();
    const user = useContext(UserContext);

    const [accountMenuButton, setAccountMenuButton] = useState<HTMLLIElement | null>(null);

    return (
        <header className={classes.header}>
            <Container maxWidth="md">
                <nav className={classes.nav}>
                    <ul className={classes.navList}>
                        <li><NavLink exact to={`${process.env.PUBLIC_URL + '/'}`} className={classes.link} activeClassName={classes.activeLink}>Home</NavLink></li>
                        <li><NavLink to={`${process.env.PUBLIC_URL + '/forum'}`} className={classes.link} activeClassName={classes.activeLink}>Forum</NavLink></li>
                        <li><NavLink to={`${process.env.PUBLIC_URL + '/repository'}`} className={classes.link} activeClassName={classes.activeLink}>Repository</NavLink></li>
                    </ul>
                    {
                        user ?
                        <ul className={classes.navList}>
                            <li className={classes.accountMenuButton} onClick={(e) => setAccountMenuButton(e.currentTarget)}>
                                <AccountCircle/>
                                <span>{user.name}</span>
                            </li>
                            <Popover
                                open={!!accountMenuButton}
                                anchorEl={accountMenuButton}
                                onClose={() => setAccountMenuButton(null)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <div className={classes.accountMenu}>
                                    <span onClick={() => auth.signOut()} className={classes.link}>Sign Out</span>
                                </div>
                            </Popover>
                        </ul>
                        :
                        <ul className={classes.navList}>
                            <li><NavLink to={`${process.env.PUBLIC_URL + '/signin'}`} className={classes.link} activeClassName={classes.activeLink}>Sign In</NavLink></li>
                            <li><NavLink to={`${process.env.PUBLIC_URL + '/signup'}`} className={classes.link} activeClassName={classes.activeLink}>Sign Up</NavLink></li>
                        </ul>
                    }
                </nav>
            </Container>
        </header>
    )
}
