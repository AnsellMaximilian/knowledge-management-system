import { Container, IconButton, makeStyles, Popover } from '@material-ui/core'
import { AccountCircle, Menu } from '@material-ui/icons';
import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import UserContext from '../contexts/UserContext';
import { auth } from '../utils/firebase';
import urlFormatter from '../utils/urlFormatter';

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        padding: theme.spacing(2),
        position: 'relative',
        // zIndex: 20
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        // zIndex: 20,
        [theme.breakpoints.down('sm')]: {
            '& $openNavButton': {
                display: 'flex'
            },
            '& $mainNavList': {
                zIndex: 10,
                position: 'absolute',
                left: 0,
                backgroundColor: theme.palette.primary.main,
                width: '100%',
                flexDirection: 'column',
                '& li': {
                    padding: theme.spacing(1),
                    margin: 0
                }
            }
        }
    },
    navList: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',
        display: 'flex',
    },

    mainNavList: {
      top: '-200%',
      transition: 'all 0.25s'
    },

    mainNavListOpen: {
        top: '100%',
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
        cursor: 'pointer',
    },

    accountMenu: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        width: 100,
        '& $link': {
            color: theme.palette.text.primary,
            cursor: 'pointer',
            '&:hover': {
                fontWeight: 'bold'
            }
        }
    },

    openNavButton: {
        color: 'white',
        padding: 0,
        display: 'none'
    }
}))

export default function Header() {
    const classes = useStyles();
    const user = useContext(UserContext);

    const [accountMenuButton, setAccountMenuButton] = useState<HTMLLIElement | null>(null);
    const [isMainNavOpen, setIsMainNavOpen] = useState(false);

    return (
        <header className={classes.header}>
            <Container maxWidth="md">
                <nav className={classes.nav}>
                    <IconButton size="small" className={classes.openNavButton} onClick={() => setIsMainNavOpen(isOpen => !isOpen)}>
                        <Menu color="inherit" fontSize="small"/>
                    </IconButton>
                    <ul className={`${classes.navList} ${classes.mainNavList} ${isMainNavOpen && classes.mainNavListOpen}`}>
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
                                    <Link to={urlFormatter('/profile')}><span className={classes.link}>Profile</span></Link>
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
