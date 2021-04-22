import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { Delete, GetApp } from '@material-ui/icons'
import React, { useContext, useEffect } from 'react'
import UserContext from '../contexts/UserContext'
import { File } from '../types'
import { storage } from '../utils/firebase'

interface Props {
    open: boolean;
    setIsFileDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
    file: File | null;
    getFiles: () => void;
}

const useStyles = makeStyles(theme => ({
    container: {
        width: theme.breakpoints.values.sm,
        maxWidth: '100%'
    },

    title: {
        '& > *': {
            fontWeight: 'bold'
        }
    },

    description: {
        margin: 0
    },
    deleteButton: {
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: theme.palette.error.main,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        }
    },
}))

export default function FileDetail({open, setIsFileDetailOpen, file, getFiles}: Props) {
    const classes = useStyles();

    const user = useContext(UserContext);

    const deleteFile = () => {
        if(file){
            storage.ref().child(file.ref.name).delete()
                .then(() => {
                    getFiles();
                })
            setIsFileDetailOpen(false);
        }
    }

    useEffect(() => {
        if(file){
            
        }
    }, [file])

    return (
        <Dialog open={open} onClose={() => setIsFileDetailOpen(false)} >
            {
                file &&
                <Container className={classes.container} maxWidth="sm">
                    <DialogTitle className={classes.title}>{file.ref.name}</DialogTitle>
                    <DialogContent>
                        <p className={classes.description}>{file.description}</p>
                        <DialogActions>
                            {
                                user && user.uid === file.userId &&
                                <Button variant="contained" className={classes.deleteButton}>
                                    <Delete onClick={deleteFile}/>
                                </Button>
                            }
                            <a href={file.url} download>
                                <Button variant="contained" color="primary">
                                    <GetApp/>
                                </Button>
                            </a>
                        </DialogActions>
                    </DialogContent>
                </Container>
            }
        </Dialog>
    )
}
