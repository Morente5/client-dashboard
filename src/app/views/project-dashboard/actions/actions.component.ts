import { Component, OnInit } from '@angular/core';

import { SafeResourceUrl } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';

import { ProjectService } from './../services/project.service';
import { Project } from '@bmc-core/model/project';

@Component({
	selector: 'bmc-actions',
	templateUrl: './actions.component.html',
	styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

	url: SafeResourceUrl
	project: Project

	constructor(
		private route: ActivatedRoute,
		private projectService: ProjectService
	) { }

	ngOnInit() {
		this.project = this.route.snapshot.data.project

		this.projectService.actionsUrl$(this.project.id)
			.subscribe(url => this.url = url)

	}

}
