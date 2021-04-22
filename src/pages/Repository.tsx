import { Button, Card, CardContent, makeStyles } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import { FileListData } from '../types';
import { db, storage } from '../utils/firebase';
import urlFormatter from '../utils/urlFormatter';

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
    const [files, setFiles] = useState<FileListData[]>([]);

    const fileCards = files.map(file => (
        <Card key={file.name} className={classes.fileCard}>
            <CardContent>
                <Link to={urlFormatter(`test`)}>
                    <h2 className={classes.fileCardTitle}>{file.name}</h2>
                </Link>
                <h3 className={classes.fileCardUserName}>By {file.userName}</h3>
            </CardContent>
        </Card>
    ))

    const getFiles = () => {
        storage.ref().listAll()
            .then(res => {
                const filePromises = res.items.map(item => {
                    
                    return new Promise<FileListData>((resolve, reject) => {
                        return item.getMetadata()
                            .then(metadata => {
                                const userId = {
                                    userId: 'unknown',
                                    ...metadata.customMetadata
                                }.userId;

                                db.collection('userProfiles').doc(userId).get()
                                    .then(userProfileSnapshot => {
                                        const userName = {
                                            name: 'Unknown',
                                            ...userProfileSnapshot.data()
                                        }.name;
                                        resolve(
                                            {
                                                name: item.name,
                                                userName
                                            }
                                        )
                                    })
                            })
                    })
                })

                Promise.all(filePromises).then(files => {
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
            <div className={classes.fileCardsContainer}>
                {fileCards}
            </div>
            <FileUpload 
                open={isFileUploadOpen} 
                setIsFileUploadOpen={setIsFileUploadOpen}
                getFiles={getFiles}
            />
        </div>
    )
}
