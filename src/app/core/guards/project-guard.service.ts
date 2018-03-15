import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { take, map, tap } from 'rxjs/operators'

import { NotificationsService } from 'angular2-notifications';

import { AuthService } from '@bmc-core/services/auth.service';

@Injectable()
export class ProjectGuard implements CanActivate {
	constructor(
		private router: Router,
		private authService: AuthService,
		private notificationsService: NotificationsService
	) { }

	canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
		return this.authService.currentUser$.pipe(
			take(1),
			map(user => {
				if (user.isAdmin) {
					return this.authService.currentUserProjects.findIndex(project => project.id === next.params.projectID) !== -1
				}
				if (user.verified) {
					return (user.projects.hasOwnProperty(next.params.projectID) && user.projects[next.params.projectID])
				}
				return false
			}),
			tap(allowed => {
				if (!allowed) {
					this.router.navigate([''])
				}
			})
		)
	}

}
