import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import {
	NbThemeModule,
	NbMenuModule,
	NbSidebarService,
	NbMenuService,
	NbMediaBreakpointsService
} from '@nebular/theme';

// Root Component
import { AppComponent } from './app.component';

// All components exported by this module
import { LayoutModule } from './layout/layout.module';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Firebase
import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Providers
import { SharedModule } from './shared/shared.module';

import {
	SimpleNotificationsModule,
	NotificationsService
} from 'angular2-notifications';


import {
	PushNotificationsModule, PushNotificationsService
} from 'ng-push';
/**
 * The app bootstrapper module
 */
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,

		AppRoutingModule,
		LayoutModule,
		SharedModule.withProviders(),

		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule.enablePersistence(),
		AngularFireAuthModule,

		SlimLoadingBarModule.forRoot(),

		NbMenuModule.forRoot(),
		NbThemeModule.forRoot({ name: 'default' }),

		SimpleNotificationsModule.forRoot(),
		PushNotificationsModule,
	],
	providers: [
		// Global Services
		NotificationsService,
		PushNotificationsService,

		NbSidebarService,
		NbMenuService,
		NbMediaBreakpointsService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
