import { Component, OnInit } from '@angular/core';

import { StarwarsService } from '../services/starwars.service/starwars.service';
import { PaginatorService } from '../services/paginator.service/paginator.service';

import { tap } from 'rxjs/operators';

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
	public searchValue: string;

	constructor(
		private readonly starwarsService: StarwarsService,
		private readonly paginatorService: PaginatorService
	) {}

	ngOnInit() {
		this.getCharacters();
	}

	private getCharacters(page: number = 1, filter: string = this.searchValue): void {
		this.starwarsService.getCharacters(page, filter)
		.subscribe(
			res => this.characterList = res,
			err => console.log(err),
			() => this.getPages()
		);
	}

	public deleteCharacter(character: ICharacter): void {
		if(confirm("Are you sure want to delete "+character.name + "?")) {
			this.starwarsService.deleteCharacter(character.id).pipe(
				tap(() => this.getCharacters())
			).subscribe(
				() => {},
				error => console.log(error),
				() => alert(character.name + " Deleted!")
			);
		}
	}

	private getPages(): void {
		this.paginatorService.getPages().subscribe(res => this.paginationPages = res);
	}

	public changePage(event: Event, page: number): void {
		event.preventDefault();
		this.getCharacters(page);
	}

	public search(): void {
		this.getCharacters();
	}
}
