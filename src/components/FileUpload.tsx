import { Button, Dialog, DialogTitle, Input, makeStyles, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import UserContext from '../contexts/UserContext';
import { FileMetaData } from '../types'
import { storage } from '../utils/firebase'

interface Props {
    open: boolean;
    setIsFileUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles(theme =>({
    uploadForm: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(0, 3, 3, 3)
    },

    uploadFormInput: {
        marginBottom: theme.spacing(2)
    }
}))

export default function FileUpload({open, setIsFileUploadOpen}: Props) {
    const classes = useStyles();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileDescription, setFileDescription] = useState('');
    
    const user = useContext(UserContext);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if(selectedFile && user){
            const metaData: FileMetaData = {
                customMetadata: {
                    description: fileDescription,
                    userId: user.uid
                }
            }
            storage.ref().child(selectedFile.name).put(selectedFile, metaData)
                .then(() => {
                    setFileDescription('');
                    setIsFileUploadOpen(false);
                })
            
        }
    }

    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if(e.target.files){
            const file = e.target.files[0];
            setSelectedFile(file)
        }
    }

    return (
        <Dialog open={open} onClose={() => setIsFileUploadOpen(false)}>
            <DialogTitle>Upload File</DialogTitle>
            <form onSubmit={handleSubmit} className={classes.uploadForm}>
                <Input 
                    type="file" 
                    name="file"
                    onChange={handleFileChange}
                    className={classes.uploadFormInput}
                />
                <TextField
                    type="text"
                    name="description"
                    label="Description"
                    variant="outlined"
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                    className={classes.uploadFormInput}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Upload
                </Button>
            </form>
        </Dialog>
    )
}
