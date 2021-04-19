import firebase from 'firebase';

export interface UserProfile {
    bio?: string;
    name: string;
}

export interface User extends firebase.User, UserProfile{

}
