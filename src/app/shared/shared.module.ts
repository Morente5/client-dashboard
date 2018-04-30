import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MomentModule } from 'ngx-moment';


import { WidgetsModule } from './widgets/widgets.module';
import { slugify } from './tools/tools.module';

// import { RolesPipe } from './pipes/user-role.pipe';
import { SectionPipe } from './pipes/section.pipe';
import { InitialsPipe } from './pipes/initials.pipe';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,

		MomentModule,

		WidgetsModule,
	],
	declarations: [
		SectionPipe,
		InitialsPipe
		// RolesPipe
	],
	exports: [
		CommonModule,
		FormsModule,
		RouterModule,

		MomentModule,

		WidgetsModule,

		SectionPipe,
		InitialsPipe
		// RolesPipe
	]
})
export class SharedModule { }
