import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { GetApp } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { File } from '../types'

interface Props {
    open: boolean;
    setIsFileDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
    file: File | null;
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
    }
}))

export default function FileDetail({open, setIsFileDetailOpen, file}: Props) {
    const classes = useStyles();

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
