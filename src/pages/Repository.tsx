import { Button, makeStyles } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons';
import React, { useState } from 'react'
import FileUpload from '../components/FileUpload';
import { storage } from '../utils/firebase';

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    uploadButton: {
        textTransform: 'none',
        fontWeight: 'bold',

    },
}))

export default function Repository() {
    const classes = useStyles();

    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
    const [files, setFiles] = useState(null)

    const getFiles = () => {
        storage.ref().listAll()
            .then(res => {
                res.items.forEach(item => {
                    console.log(item.name)
                })
        })
    }

    return (
        <div>
            <div className={classes.header}>
                <h1>Repository</h1>
                <Button 
                    variant="contained" 
                    color="primary"
                    className={classes.uploadButton}
                    onClick={() => setIsFileUploadOpen(true)}
                >
                    Upload File <CloudUpload/>
                </Button>
            </div>
            <div>

            </div>
            <FileUpload 
                open={isFileUploadOpen} 
                setIsFileUploadOpen={setIsFileUploadOpen}
            />
        </div>
    )
}
