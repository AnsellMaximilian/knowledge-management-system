import { Button, Card, ClickAwayListener, Input, makeStyles } from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import React, { useContext, useEffect, useRef, useState } from 'react'
import UserContext from '../contexts/UserContext';
import { CommentReadData, Comment } from '../types';
import { db } from '../utils/firebase';

const useStyles = makeStyles(theme => ({
    commentsContainer: {
        textAlign: 'left'
    },
    createButton: {
        textTransform: 'none',
        fontWeight: 'bold',

    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    commentInput: {
        display: 'flex'
    },

    closedCommentInput: {
        // position: 'absolute',
        // top: '-100%'
    },

    commentCard: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(1)
    },

    commentCardUserName: {
        margin: 0,
        fontSize: '1rem'
    },

    commentCardContent: {
        margin: 0,
    }
}))

export default function CommentsSection({articleId}: {articleId: string}) {
    const classes = useStyles();

    const [comments, setComments] = useState<CommentReadData[]>([]);
    const [isCommentInputOpen, setIsCommentInputOpen] = useState(false);
    const [commentInput, setCommentInput] = useState('')

    const commentInputRef = useRef<HTMLInputElement>(document.createElement('input'));

    const user = useContext(UserContext);

    const commentsCards = comments.map(comment => {
        return (
            <Card className={classes.commentCard} key={comment.id}>
                <h4 className={classes.commentCardUserName}>{comment.userName}</h4>
                <p className={classes.commentCardContent}>{comment.content}</p>
            </Card>
        )
    })

    const saveComment: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // e.stopPropagation();
        if(user){
            const comment: Comment = {
                content: commentInput,
                articleId,
                userId: user.uid
            }
            db.collection('articleComments').add(comment);
            setCommentInput('');
            setIsCommentInputOpen(false);
        }
    }

    const openCommentInput = () => {
        setCommentInput('');
        setIsCommentInputOpen(true);
    }

    const closeCommentInput: (event: React.MouseEvent<Document, MouseEvent>) => void = (e) => {
        setIsCommentInputOpen(false);
    }

    useEffect(() => {
        db.collection('articleComments').where('articleId', '==', articleId)
            .onSnapshot(commentsSnapshot => {
                const commentsPromies = commentsSnapshot.docs.map(commentSnapshot => {
                    return new Promise<CommentReadData>((resolve, reject) => {
                        const commentReadData: CommentReadData = {
                            userName: "Anonymous",
                            id: commentSnapshot.id,
                            content: '',
                            articleId,
                            userId: '',
                            ...commentSnapshot.data()
                        }
                        return db.collection('userProfiles').doc(commentReadData.userId).get()
                            .then(userProfileSnapshot => {
                                const userName = {
                                    name: "",
                                    ...userProfileSnapshot.data()
                                }.name;
                                commentReadData.userName = userName;
                                resolve(commentReadData)
                            })
                    })
                })
                Promise.all(commentsPromies)
                    .then(comments => setComments(comments))
            })
            
    }, [articleId])

    useEffect(() => {
        if(isCommentInputOpen){
            commentInputRef.current.focus();
        }
    }, [isCommentInputOpen])

    return (
        <div className={classes.commentsContainer}>
            <div className={classes.header}>
                <h3>Comments</h3>
                <Button 
                    variant="contained" 
                    color="primary"
                    className={classes.createButton}
                    onClick={openCommentInput}
                >
                    Write Comment <Edit/>
                </Button>
            </div>
            {
                isCommentInputOpen  &&
                <ClickAwayListener onClickAway={closeCommentInput}>
                    <form 
                        className={`${classes.commentInput} ${!!!isCommentInputOpen && classes.closedCommentInput}`}
                        onSubmit={saveComment}
                    >
                        <Input 
                            type="text" 
                            placeholder="Your comment" 
                            fullWidth
                            inputRef={commentInputRef}
                            // onBlur={closeCommentInput}
                            value={commentInput}
                            required
                            onChange={e => setCommentInput(e.target.value)}
                        />
                        <Button 
                            variant="contained" 
                            color="primary"
                            className={classes.createButton}
                            type="submit"
                        >
                            Post
                        </Button>
                    </form>
                </ClickAwayListener>
            }

            <div>
                {commentsCards}
            </div>
        </div>
    )
}
