import { Button, Card, CardContent, LinearProgress, makeStyles } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import FileDetail from '../components/FileDetail';
import FileUpload from '../components/FileUpload';
import { File } from '../types';
import { db, storage } from '../utils/firebase';

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

    fileCardsContainer: {
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap'
    },

    fileCard: {
        cursor: 'pointer',
        width: 200,
        textAlign: 'left',
        margin: theme.spacing(0, 2, 2, 0)
    },

    fileCardTitle: {
        margin: 0,
        fontSize: '1rem',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    fileCardUserName: {
        margin: 0,
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: '1rem',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}))

export default function Repository() {
    const classes = useStyles();

    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
    const [isFileDetailOpen, setIsFileDetailOpen] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [detailedFile, setDetailedFile] = useState<File | null>(null)

    const fileCards = files.map(file => (
        <Card key={file.ref.name} className={classes.fileCard}>
            <CardContent>
                <h2 className={classes.fileCardTitle} onClick={() => openFileDetail(file)}>{file.ref.name}</h2>
                <h3 className={classes.fileCardUserName}>By {file.userName}</h3>
            </CardContent>
        </Card>
    ))

    const openFileDetail = (file: File) => {
        setDetailedFile(file);
        setIsFileDetailOpen(true);
    }

    const getFiles = () => {
        storage.ref().listAll()
            .then(res => {
                const filePromises = res.items.map(item => {
                    return new Promise<File>((resolve, reject) => {
                        return item.getMetadata()
                            .then(metadata => {
                                const {userId, description}: {userId: string, description: string} = {
                                    userId: 'unknown',
                                    description: 'no description',
                                    ...metadata.customMetadata
                                };

                                item.getDownloadURL()
                                    .then(url => {
                                        db.collection('userProfiles').doc(userId).get()
                                            .then(userProfileSnapshot => {
                                                const userName = {
                                                    name: 'Unknown',
                                                    ...userProfileSnapshot.data()
                                                }.name;
                                                resolve(
                                                    {
                                                        ref: item,
                                                        userName,
                                                        description,
                                                        url,
                                                        userId
                                                    }
                                                )
                                            })
                                    })
                            })
                    })
                })

                Promise.all(filePromises)
                    .then(files => {
                        setFiles(files);
                    })
            })
    }

    useEffect(() => {
        getFiles();
    }, [])

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
            <div className={`${files.length ? classes.fileCardsContainer : ''}`}>
                {
                    files.length ? (
                        fileCards
                    ) : (
                        <LinearProgress color="primary"/>
                    )
                }
            </div>
            <FileUpload 
                open={isFileUploadOpen} 
                setIsFileUploadOpen={setIsFileUploadOpen}
                getFiles={getFiles}
            />
            <FileDetail
                open={isFileDetailOpen}
                setIsFileDetailOpen={setIsFileDetailOpen}
                file={detailedFile}
                getFiles={getFiles}
            />
        </div>
    )
}
