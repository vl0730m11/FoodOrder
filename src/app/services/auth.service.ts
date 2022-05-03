import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, UserType } from '../models/classes';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Platform } from '@ionic/angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user$: Observable<firebase.User>;

  userSubject: Subject<User> = new Subject<User>();
  hasLogin: boolean = false;

  constructor(
    private db: AngularFirestore,
    private http: HttpClient,
    private userService: UserService,
    private facebook: Facebook,
    private googlePlus: GooglePlus,
    private firebaseAuthentication: FirebaseAuthentication,
    private platform: Platform
  ) {
    // this.user$ = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     // Logged in
    //     if (user) {
    //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       // Logged out
    //       return of(null);
    //     }
    //   })
    // );
  }

  getUser(uid: string) {
    return this.db.collection('users').doc<User>(uid).get()
      .toPromise().then(x => x.data());
  }

  getCurrentUser() {
    return of(firebase.auth().currentUser);
  }

  syncUserWithOAuth(user: User) {
    return this.db.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    }, { merge: true });
  }


  register(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
    // .catch(function (error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...


    // });
    // return firebase.auth().onAuthStateChanged(
    //   (user?) => {
    //     const currentUser = new User();
    //     if (user) {
    //       currentUser.displayName = user.displayName;
    //       currentUser.email = user.email;
    //       currentUser.emailVerified = user.emailVerified;
    //       currentUser.photoURL = user.photoURL;
    //       currentUser.isAnonymous = user.isAnonymous;
    //       currentUser.uid = user.uid;
    //       currentUser.providerData = user.providerData;
    //       currentUser.userType = UserType.APP_USER;
    //     } else {
    //       // User is signed out.
    //       // ...
    //     }
    //     return currentUser;
    //   }
    // );
  }

  firebaseLogin(email, password) {
    this.userService.saveOAuthUserType(UserType.APP_USER);
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  googleSignin() {
    if (this.isDesktop()) {
      this.userService.saveOAuthUserType(UserType.GOOGLE_USER);
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithRedirect(provider);
      return firebase.auth().getRedirectResult();
    } else {
      this.googlePlus.login({
        webClientId: 'com.googleusercontent.apps.925906930757-j4ssmo83fk21pt3rcq1lef6auot2pmdk',
        offline: true
      })
        .then(res => {
          const creds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
          console.log('Token FB:', res.authResponse.accessToken);
          return firebase.auth().signInWithCredential(creds)
            .then(success => {
              console.log('Firebase success: ' + JSON.stringify(success));
            })
            .catch(error => console.log('Firebase failure: ' + JSON.stringify(error)))
        }).catch(err => console.error('Error: ', err));
    }
  }

  // googleSignin() {
  //   this.firebaseAuthentication.signInWithGoogle()
  //   this.googlePlus.login({
  //     'webClientId': '<Your web client ID>',
  //     'offline': true
  //   })

  //   return .login(['public_profile', 'user_friends', 'email'])
  //     .then(res => {
  //       const creds = firebase.auth.GoogleAuthProvider.credential(res.authResponse.accessToken);
  //       return firebase.auth().signInWithCredential(creds);
  //     });
  // }

  facebookSignin() {
    this.userService.saveOAuthUserType(UserType.FACEBOOK_USER);
    console.log(this.platform);

    if (this.isDesktop()) {
      console.log('mobileweb');
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider);
      return firebase.auth().getRedirectResult();
    } else {
      return this.facebook.login(['email'])
        .then(res => {
          const creds = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          console.log('Token FB:', res.authResponse.accessToken);

          return firebase.auth().signInWithCredential(creds)
            .then(success => {
              console.log('Firebase success: ' + JSON.stringify(success));
            });
          // return this.firebaseAuthentication.signInWithFacebook(res.authResponse.accessToken) //.signInWithCredential(creds);
        });
    }

  }

  async sendVerificationEmail() {
    return firebase.auth().currentUser.sendEmailVerification();

  }

  async signOut() {
    this.userService.removeOAuthUserType();

    // this.afAuth.signOut();
    return firebase.auth().signOut();
  }

  signupAppUser(user: User) {
    if (!user) { return of(null); }
    return this.http.post<User>(this.userAPI() + '/signup', user);
  }

  oAuthLogin(user: User) {
    if (!user || (!user.emailVerified && user.userType === UserType.APP_USER)) { return of(null); }
    return this.http.post<User>(this.userAPI() + '/oauth-login', user);
  }

  login(user: User) {
    return this.http.post<User>(this.userAPI() + '/login', user);
  }

  userAPI() {
    return environment.foodApiUrl + '/user';
  }

  private isDesktop() {
    return this.platform.is('mobileweb') || this.platform.is('desktop');
  }
}

