import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin.routing';

import { NbCheckboxComponent } from '@nebular/theme'
import { SharedModule } from '@bmc-shared/shared.module';
import { SectionPipe } from '@bmc-shared/pipes/section.pipe';

import { AdminUsersService } from '@bmc-views/admin/services/users/admin-users.service';
import { AdminProjectsService } from '@bmc-views/admin/services/projects/admin-projects.service';

import { AngularFireModule } from 'angularfire2';

import { AdminComponent } from './admin.component';

import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminProjectsComponent } from './admin-projects/admin-projects.component';

import { UsersTableComponent } from './admin-users/users-table/users-table.component';
import { UserDetailComponent } from './admin-users/user-detail/user-detail.component';

import { ProjectsTableComponent } from './admin-projects/projects-table/projects-table.component';
import { ProjectDetailComponent } from './admin-projects/project-detail/project-detail.component';


@NgModule({
	imports: [
		CommonModule,
		AdminRoutingModule,
		FormsModule,

		SharedModule
	],
	providers: [
		AdminUsersService,
		AdminProjectsService,
		SectionPipe
	],
	declarations: [
		AdminComponent,
		AdminUsersComponent,
		AdminProjectsComponent,
		UsersTableComponent,
		UserDetailComponent,
		ProjectsTableComponent,
		ProjectDetailComponent,
		SectionPipe
	]
})
export class AdminModule { }
