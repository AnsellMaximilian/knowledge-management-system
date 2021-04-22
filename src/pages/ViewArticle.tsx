import { Button, makeStyles, Paper } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import CommentsSection from '../components/CommentsSection';
import UserContext from '../contexts/UserContext';
import { Article, ArticleReadData } from '../types';
import { db } from '../utils/firebase';
import urlFormatter from '../utils/urlFormatter';

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    articleDetails: {
        textAlign: 'left'
    },
    articleTitle: {
        margin: 0
    },

    articleUserName: {
        margin: 0,
        color: theme.palette.text.secondary
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

    articleBody: {
        whiteSpace: 'pre-line',
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        textAlign: 'left',
        '& p': {
            margin: 0
        }
    },

    commentsContainer: {
        textAlign: 'left'
    }
}))

export default function ViewArticle() {

    const classes = useStyles();

    const { id } = useParams<{id: string}>();

    const [article, setArticle] = useState<ArticleReadData | null>(null);

    const user = useContext(UserContext);

    const history = useHistory();

    useEffect(() => {
        db.collection('articles').doc(id).get()
            .then(articleSnapshot => {
                const article: Article = {
                    userId: '',
                    title: '',
                    blocks: [],
                    ...articleSnapshot.data(),
                };
                if(article.userId){
                    db.collection('userProfiles').doc(article.userId).get()
                        .then(userProfileSnapshot => {
                            let userName: string = {
                                name: "Name not found",
                                ...userProfileSnapshot.data()
                            }.name;

                            const articleReadData: ArticleReadData = {
                                ...article,
                                userName,
                                id: articleSnapshot.id
                            }

                            setArticle(articleReadData);
                        })
                }
            })
    }, [id]);

    const deleteArticle = () => {
        if(article){
            db.collection('articles').doc(article.id).delete();
            history.push(urlFormatter('/forum'))
        }
    }

    return (
        <div>
            {
                article ?
                <div>
                    <div className={classes.header}>
                        <div className={classes.articleDetails}>
                            <h1 className={classes.articleTitle}>{article.title}</h1>
                            <h2 className={classes.articleUserName}>By {article.userName}</h2>
                        </div>
                        {
                            user && article && user.uid === article.userId ? 
                            <Button 
                                variant="contained" 
                                className={classes.deleteButton}
                                onClick={deleteArticle}
                            >
                                Delete Article <Delete/>
                            </Button>
                            : null
                        }
                    </div>
                    <Paper className={classes.articleBody} elevation={3}>
                        {
                            article.blocks.map((block, index) => <p key={index} dangerouslySetInnerHTML={{__html: block.data.text}}></p>)
                        }
                    </Paper>
                    <CommentsSection articleId={article.id}/>
                </div>
                :
                <h1>Article Not Found</h1>
            }
        </div>
    )
}
