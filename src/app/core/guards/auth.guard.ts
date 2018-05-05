import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators'

import { NotificationsService } from 'angular2-notifications';

import { AuthService } from '@bmc-core/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthService,
		private notificationsService: NotificationsService
	) { }

	canActivate(): Observable<boolean> {
		return this.authService.currentUser$.pipe(
			take(1),
			map(user => {
				return user && user.verified
			}),
			tap(verified => {
				if (!verified) {
					this.notificationsService.alert('You have to sign in first')
					this.router.navigate(['login'])
				}
			})
		)
	}
}
