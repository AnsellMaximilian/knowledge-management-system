import { Button, Card, CardContent, makeStyles } from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ArticleReadData, Article } from '../types';
import { db } from '../utils/firebase';

const useStyles = makeStyles(theme => ({
    createButton: {
        textTransform: 'none',
        fontWeight: 'bold',

    },

    createLink: {
        color: 'white',
        textDecoration: 'none',
        display: 'flex'
        
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    articleCard: {
        textAlign: 'left',
        marginBottom: theme.spacing(2),
        cursor: 'pointer',
    },
    articleCardTitle: {
        margin: 0
    },
    articleCardUserName: {
        margin: 0,
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightRegular
    }
}))

export default function Forum() {
    const classes = useStyles();

    const [articles, setArticles] = useState<ArticleReadData[]>([]);

    const articleCards = articles.map(article => {
        return (
            <Card key={article.id} className={classes.articleCard}>
                <CardContent>
                    <h2 className={classes.articleCardTitle}>{article.title}</h2>
                    <h3 className={classes.articleCardUserName}>By {article.userName}</h3>
                </CardContent>
            </Card>
        )
    })

    useEffect(() => {

        db.collection('articles').onSnapshot(articlesSnapshot => {
            const articlesPromises = articlesSnapshot.docs.map(articleSnapshot => {
                const article: Article = {
                    userId: '',
                    title: '',
                    blocks: [],
                    ...articleSnapshot.data(),
                };
                
                return new Promise<ArticleReadData>( async (resolve, reject) => {
                    let userName = "Name not found";
                    if(article.userId){
                        const userProfileRef = (await db.collection('userProfiles').doc(article.userId).get()); 
                        userName = ({
                            name: 'Name not found',
                            ...userProfileRef.data()
                        }).name;
                    }

                    resolve(
                        {
                            ...article,
                            userName,
                            id: articleSnapshot.id
                        }
                    )
                })
                
            })
            Promise.all(articlesPromises)
                .then((articles) => {
                    setArticles(articles);
                })
        })

    }, [])

    return (
        <div>
            <div className={classes.header}>
                <h1>Forum</h1>
                <Button 
                    variant="contained" 
                    color="primary"
                    className={classes.createButton}
                >
                    <Link to="/forum/create" className={classes.createLink}>Create Article <Edit/></Link>
                    {/* Create Article <Edit/> */}
                </Button>
            </div>
            <div>
                {articleCards}
            </div>
        </div>
    )
}
