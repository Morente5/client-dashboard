import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
	selector: 'bmc-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

	public today: moment.Moment
	public month: moment.Moment[] = []
	public weeks: moment.Moment[][] = []

	constructor() { }

	ngOnInit() {
		this.today = moment().startOf('day')
		this.month = this.getMonth(this.today)
		this.weeks = this.splitWeek(this.getFullWeekMonth(this.today))

		console.log(this.weeks)
	}

	getMonth(day: moment.Moment): moment.Moment[] {
		const result: moment.Moment[] = []

		const date: moment.Moment = day
			.clone()  // Makes a copy
			.startOf('month')  // Sets date to start of a month

		while (date.month() === day.month()) {
			result.push(date.clone())
			date.add(1, 'day')
		}

		return result
	}

	getFullWeekMonth(day: moment.Moment): moment.Moment[] {
		const result: moment.Moment[] = []

		const date: moment.Moment = day
			.clone()  // Makes a copy
			.startOf('month')  // Sets date to start of a month
			.startOf('week')  // Sets date to the first day of the week
		// console.log(date)

		while (date.month() <= day.month() || !date.isSame(date.clone().startOf('week'))) {
			result.push(date.clone())
			date.add(1, 'day')
		}

		return result
	}

	splitWeek(month: moment.Moment[]): moment.Moment[][] {
		const result: moment.Moment[][] = []
		while (month.length) {
			result.push(month.splice(0, 7))
		}
		return result
	}

}
