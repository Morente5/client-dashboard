import { Component, OnInit } from '@angular/core';

import { SafeResourceUrl } from '@angular/platform-browser';

import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ProjectService } from './../services/project.service';

@Component({
	selector: 'bmc-analytics',
	templateUrl: './analytics.component.html',
	styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

	url: SafeResourceUrl
	projectID: string

	constructor(
		private route: ActivatedRoute,
		private projectService: ProjectService
	) { }

	ngOnInit() {
		this.route.parent.params.subscribe((params: Params) => {
			this.projectID = params['projectID'];
			this.url$.subscribe(url => this.url = url)
		});

	}

	get url$(): Observable<SafeResourceUrl> {
		return this.projectService.analyticsUrl$(this.projectID)
	}
}
