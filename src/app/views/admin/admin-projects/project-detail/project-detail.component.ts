
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { AdminProjectsService } from '@bmc-views/admin/services/admin-projects.service';
import { AdminUsersService } from '@bmc-views/admin/services/admin-users.service';

// import { RolesPipe } from '@bmc-shared/pipes/project-role.pipe';
import { Project } from '@bmc-core/model/project';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { SectionPipe } from '@bmc-shared/pipes/section.pipe';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

@Component({
	selector: 'bmc-project-detail',
	templateUrl: './project-detail.component.html',
	styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

	project$: Observable<Project>
	projectData: Project

	projectDataForm: NgForm


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private adminProjectsService: AdminProjectsService,
		public adminUsersService: AdminUsersService,
		private modalService: NgbModal,
		private notificationsService: NotificationsService
	) { }

	ngOnInit() {

		this.project$ = this.route.params.pipe(
			switchMap(params => {
				const projectID = params['projectID'];
				return this.adminProjectsService.getProjectDocument$(projectID).snapshotChanges()
			}),
			map(project => {
				const data = project.payload.data() as Project
				const id = project.payload.id
				return new Project({id, ...data})
			})
		)

		this.project$.subscribe(project => {
			this.projectData = project

		})

	}

	sectionNames() {
		return this.projectData.sections ? Object.keys(this.projectData.sections) : undefined
	}

	assignableUsers() {
		return this.adminUsersService.users.filter(user => user.isAdmin || user.isAuthor)
	}

	setName(): Promise<any> {
		return this.adminProjectsService.setName(this.projectData.id, this.projectData.name)
			.then(() => {
				this.notificationsService.success('Name modified', this.projectData.name)
			})
			.catch(error => {
				this.notificationsService.error('Error trying to modify name', error)
			})
	}

	sectionsAreEquivalent(sections) {

		const a = this.projectData.sections
		const b = sections

		const aProps = Object.getOwnPropertyNames(a);
		const bProps = Object.getOwnPropertyNames(b);

		if (aProps.length !== bProps.length) {
			return false;
		}

		for (let i = 0; i < aProps.length; i++) {
			const propName = aProps[i];

			if (a[propName] !== b[propName]) {
				return false;
			}
		}

		return true;
	}

	setSections(): Promise<any> {
		return this.adminProjectsService.setSections(this.projectData.id, this.projectData.sections)
			.then(() => {
				this.notificationsService.success('Project sections modified')
			})
			.catch(error => {
				this.notificationsService.error('Error trying to modify project sections', error)
			})
	}

	setUserAssigned(): Promise<any> {
		return this.adminProjectsService.setUserAssigned(this.projectData.id, this.projectData.userAssigned)
			.then(() => {
				this.notificationsService.success('User assigned to project modified')
			})
			.catch(error => {
				this.notificationsService.error('Error trying to modify user assigned to project', error)
			})
	}

	deleteProject(): Promise<any> {
		const name = this.projectData.name.slice()  // Copy it since it's going to be deleted
		return this.adminProjectsService.deleteProject(this.projectData.id)
			.then(() => {
				this.notificationsService.success('Deleted project', name)
				this.router.navigate(['admin', 'projects'])
			})
			.catch(error => {
				this.notificationsService.error('Error trying to delete project', name)
			})
	}

	open(content): Promise<any> {
		return this.modalService.open(content).result
			.then(
				result => this.deleteProject(),
				reason => { }
			);
	}

}
