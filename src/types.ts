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