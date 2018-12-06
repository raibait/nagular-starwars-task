import { Component, OnInit } from '@angular/core';

import { StarwarsService } from '../services/starwars.service';
import { PaginatorService } from '../services/paginator.service';

import { ICharacter } from '../shared/models/i-character'

@Component({
	selector: 'sl-list-view',
	templateUrl: './list-view.component.html',
	styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

	private paginationPages: Object;

	public characterList: ICharacter[];

	constructor(
		private readonly starwarsService: StarwarsService,
		private readonly paginatorService: PaginatorService
	) {}

	ngOnInit() {
		this.getCharacters(3);
	}

	private getCharacters(page: number):void {
		this.starwarsService.getCharacters(page)
		.subscribe(
			res => console.log(res),
			err => console.log(err),
			() => this.getPages()
		);
	}

	private getPages():void {
		this.paginatorService.getPages().subscribe(res => console.log(res));
	}
}
