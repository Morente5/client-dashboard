import { Injectable } from '@angular/core';

import { environment } from '@bmc-environments/environment';

import { AngularFireAuth } from 'angularfire2/auth';

import { firebase } from '@firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@bmc-core/model/user'

@Injectable()
export class AdminUsersService {

	public users$: Observable<User[]>;
	public users: User[]
	constructor(
		public afAuth: AngularFireAuth,
		private afs: AngularFirestore
	) {

		const usersCollection$ = this.afs.collection<User>('users').snapshotChanges()
		this.users$ = usersCollection$.pipe(
			map(user => {
				return user.map(u => {
					const data = u.payload.doc.data() as User
					const id = u.payload.doc.id
					return new User({ id, ...data })
				})
			})
		)

		this.users$.subscribe(users => this.users = users)

	}

	getUserDocument$(id): AngularFirestoreDocument<User> {
		return this.afs.doc<User>(`users/${id}`)
	}

	createUser(em, pwd): Promise<any> {
		const createUserFirebaseApp = firebase.initializeApp(environment.firebaseConfig, 'createUser')
		return createUserFirebaseApp.auth().createUserWithEmailAndPassword(em, pwd)
			.then(firebaseUser => {
				createUserFirebaseApp.auth().currentUser.sendEmailVerification()
				return firebaseUser.uid
			})
			.finally(() => {
				createUserFirebaseApp.auth().signOut()
				createUserFirebaseApp.delete()
			})
	}

	public deleteUser(userID: string): Promise<any> {
		// Delete user from Firestore (DB)
		return this.afs.doc(`users/${userID}`).delete()
	}

	public setName(userID: string, newName: string): Promise<any> {
		// Save name on Firestore (DB)
		return this.afs.doc(`users/${userID}`).set(
			{ displayName: newName },
			{ merge: true }
		)
	}
	public setAccess(userID: string, access: string): Promise<any> {
		// Save access on Firestore (DB)
		return this.afs.doc(`users/${userID}`).set(
			{ access: access },
			{ merge: true }
		)
	}
	public setProjects(userID: string, projects: { [name: string]: boolean; }): Promise<any> {
		// Save projects on Firestore (DB)
		return this.afs.doc(`users/${userID}`).set(
			{ projects: projects },
			{ merge: true }
		)
	}

}
