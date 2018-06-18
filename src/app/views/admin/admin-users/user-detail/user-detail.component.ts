import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { AdminUsersService } from '@bmc-views/admin/services/admin-users.service';

import { AngularFirestoreDocument } from 'angularfire2/firestore';
// import { RolesPipe } from '@bmc-shared/pipes/user-role.pipe';
import { User } from '@bmc-core/model/user';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '@bmc-core/services/auth.service';

@Component({
	selector: 'bmc-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

	user$: Observable<User>
	userData: User

	userDataForm: NgForm

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public authService: AuthService,
		private adminUsersService: AdminUsersService,
		private modalService: NgbModal,
		private notificationsService: NotificationsService
	) { }

	ngOnInit() {

		this.user$ = this.route.params.pipe(
			switchMap(params => {
				const userID = params['userID'];
				return this.adminUsersService.getUserDocument$(userID).snapshotChanges()
			}),
			map(user => {
				const data = user.payload.data() as User
				const id = user.payload.id
				return new User({ id, ...data })
			})
		)

		this.user$.subscribe(user => this.userData = user)

	}

	setName(): Promise<any> {
		return this.adminUsersService.setName(this.userData.id, this.userData.displayName)
			.then(() => {
				this.notificationsService.success('Name modified', this.userData.displayName)
			})
			.catch(error => {
				this.notificationsService.error('Error trying to modify name', error)
			})
	}
	setEmail() {
		return
	}
	setAccess(): Promise<any> {
		return this.adminUsersService.setAccess(this.userData.id, this.userData.access)
			.then(() => {
				this.notificationsService.success('Access modified', this.userData.displayName)
			})
			.catch(error => {
				this.notificationsService.error('Error trying to modify access', error)
			})
	}
	setProjects(): Promise<any> {
		return this.adminUsersService.setProjects(this.userData.id, this.userData.projects)
			.then(() => {
				this.notificationsService.success('User projects modified')}
			)
			.catch(error => {
				this.notificationsService.error('Error trying to modify user projects', error)}
			)
	}

	deleteUser(): Promise<any> {
		const email = this.userData.email.slice()  // Copy it since it's going to be deleted
		return this.adminUsersService.deleteUser(this.userData.id)
			.then(() => {
				this.notificationsService.success('Deleted user', email)
				this.router.navigate(['admin', 'users'])
			})
			.catch(error => {
				this.notificationsService.error('Error trying to delete user', email)
			})
	}

	open(content): Promise<any> {
		return this.modalService.open(content).result
			.then(
				result => this.deleteUser(),
				reason => { }
			);
	}

}
