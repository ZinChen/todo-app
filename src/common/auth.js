import firebase from 'firebase'

export class Auth {
  constructor(context) {
    this.context = context
  }

  handleFirebaseAuth(provider) {
    firebase.auth().signInWithPopup(provider).then(result => {
      this.context.$router.push('/')
    }).catch((error) => {
      if (error.code == "auth/account-exists-with-different-credential") {
        this.handleAuthEmailExistsError(error)
      }
    })
  }

  handleFirebaseAuthAndLinkCredential(provider, credential) {
    firebase.auth().signInWithPopup(provider).then(result => {

      result.user.linkWithCredential(credential).then((newCredentials) => {
        this.context.$router.push('/')
      });
    })
  }

  handleAuthEmailExistsError(error) {
    firebase.auth()
      .fetchSignInMethodsForEmail(error.email)
      .then(providers => {

        // Too long "google.com": firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD
        if (providers.length && providers[0] == "google.com") {
          const provider = new firebase.auth.GoogleAuthProvider();
          this.handleFirebaseAuthAndLinkCredential(provider, error.credential)
        }
      })
  }
}
