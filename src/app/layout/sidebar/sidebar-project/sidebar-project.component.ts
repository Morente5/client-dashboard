import { Component, OnInit, Input } from '@angular/core';

import { Project } from '@bmc-core/model/project';
import { RouterService } from '@bmc-core/services/router.service';

@Component({
	selector: 'bmc-sidebar-project',
	templateUrl: './sidebar-project.component.html',
	styleUrls: ['./sidebar-project.component.scss']
})
export class SidebarProjectComponent implements OnInit {
	@Input() project: Project;
	@Input() opened: boolean;

	constructor(public routerService: RouterService) {}

	ngOnInit() {}

	getInitials(): string {
		if (this.project.name) {
			const names = this.project.name.split(' ');
			return names
				.map(n => n.charAt(0))
				.splice(0, 2)
				.join('')
				.toUpperCase();
		}
		return '';
	}
}
