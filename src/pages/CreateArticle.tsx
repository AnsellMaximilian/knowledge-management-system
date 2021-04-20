import { Button, makeStyles, Paper, TextField } from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import React, {useContext, useEffect, useState} from 'react'
import EditorJS from '@editorjs/editorjs'
import { db } from '../utils/firebase';
import UserContext from '../contexts/UserContext';
import { Article } from '../types';

const useStyles = makeStyles(theme => ({
    postButton: {
        textTransform: 'none',
        fontWeight: 'bold',
        margin: theme.spacing(1, 0, 5, 0)

    },
    editorContainer: {
        
    },
    editor: {
        padding: theme.spacing(2),
        textAlign: 'left'
    },
    header: {
        textAlign: 'left'
    },

    titleInput: {
        backgroundColor: 'white',
        border: 'none',
        outline: 'none',
        boxShadow: theme.shadows[3],
        '& *': {
            border: 'none',
            outline: 'none',
        },
        '& input': {
            fontSize: '2rem',
            fontWeight: 'bold'
        },
        '& label': {
            fontSize: '2rem',
        }
    }
}))



export default function CreateArticle() {
    const classes = useStyles();

    const editorId = 'editor';

    const [editor, setEditor] = useState<null | EditorJS>(null);
    const [articleTitle, setArticleTitle] = useState('')
    
    const user = useContext(UserContext);

    useEffect(() => {
        setEditor(new EditorJS({
            holder: editorId
        }))
    }, [])

    const postArticle = () => {
        if(editor && user){
            editor.save()
                .then((output) => {
                    const article: Article = {
                        ...output,
                        userId: user.uid,
                        title: articleTitle
                    }
                    db.collection('articles').add(article);
                    editor.clear();
                    setArticleTitle('');
                })
                .catch()
        }
    }

    return (
        <div>
            <div className={classes.header}>
                <h1>Create Article</h1>
            </div>
            <div>
                <TextField 
                    variant="outlined" 
                    margin="normal" 
                    label="Article Title"
                    fullWidth
                    className={classes.titleInput}
                    value={articleTitle}
                    onChange={e => setArticleTitle(e.target.value)}
                />
                <Paper className={classes.editor} id={editorId}>

                </Paper>
            </div>
            <Button 
                variant="contained" 
                color="primary"
                className={classes.postButton}
                fullWidth
                onClick={postArticle}
            >Post Article <Edit/></Button>
        </div>
    )
}
