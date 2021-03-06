import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AdminUsersService } from '@bmc-views/admin/services/admin-users.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

@Component({
	selector: 'bmc-admin-users',
	templateUrl: './admin-users.component.html',
	styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

	public newUserData = {email: '', password: ''}

	constructor(
		// public authService: AuthService,
		private router: Router,
		private adminUsersService: AdminUsersService,
		private modalService: NgbModal,
		private notificationsService: NotificationsService
	) {}


	ngOnInit() {}

	createUser(email: string, password: string): Promise<any> {
		return this.adminUsersService.createUser(email, password)
			.then(() => {
				this.notificationsService.success('User created')
			})
			.catch(error => {
				this.notificationsService.error('Error trying to create user', error.message)
			})
	}

	open(content): Promise<any> {
		return this.modalService.open(content).result
			.then(
				result => this.createUser(this.newUserData.email, this.newUserData.password),
				reason => { }
			);
	}
}
