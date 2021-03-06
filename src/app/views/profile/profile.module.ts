import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@bmc-shared/shared.module';

import { ProfileRoutingModule } from './profile.routing';

import { ProfileComponent } from './profile.component';


@NgModule({
	imports: [
		CommonModule,
		ProfileRoutingModule,
		FormsModule,

		SharedModule
	],
	declarations: [
		ProfileComponent
	]
})
export class ProfileModule { }
