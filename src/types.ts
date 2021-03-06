import firebase from 'firebase';
import {OutputData} from '@editorjs/editorjs';

export interface UserProfile {
    bio?: string;
    name: string;
}

export interface User extends firebase.User, UserProfile{

}

export interface Article extends OutputData {
    userId: string;
    title: string;
}

export interface ArticleReadData extends Article {
    userName: string;
    id: string;
}

export interface Comment {
    userId: string;
    articleId: string;
    content: string;
}

export interface CommentReadData extends Comment {
    userName: string;
    id: string;
}

export interface FileMetaData extends firebase.storage.UploadMetadata{
    customMetadata: {
        description: string;
        userId: string;
    }
}

export interface FileListData {
    userName: string;
    name: string;
}

export interface File {
    userName: string;
    userId: string;
    description: string;
    url: string;
    ref: firebase.storage.Reference

}
