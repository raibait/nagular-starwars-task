import { Component, OnInit } from '@angular/core';

import { StarwarsService } from '../services/starwars.service';
import { PaginatorService } from '../services/paginator.service';

import { ICharacter } from '../shared/models/i-character'
import { IPaginatorData } from '../shared/models/i-paginator-data'

@Component({
	selector: 'sl-list-view',
	templateUrl: './list-view.component.html',
	styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

	public paginationPages: IPaginatorData;

	public characterList: ICharacter[];

	constructor(
		private readonly starwarsService: StarwarsService,
		private readonly paginatorService: PaginatorService
	) {}

	ngOnInit() {
		this.getCharacters(1);
	}

	private getCharacters(page: number): void {
		this.starwarsService.getCharacters(page)
		.subscribe(
			res => this.characterList = res,
			err => console.log(err),
			() => this.getPages()
		);
	}

	private getPages(): void {
		this.paginatorService.getPages().subscribe(res => this.paginationPages = res);
	}

	public changePage(event: Event, page: number) {
		event.preventDefault();
		this.getCharacters(page);
	}


}
