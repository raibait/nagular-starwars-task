import { Component, OnInit } from '@angular/core';

import { StarwarsService } from '../services/starwars.service';

import { ICharacter } from '../shared/models/i-character'

@Component({
	selector: 'sl-list-view',
	templateUrl: './list-view.component.html',
	styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

	characterList: ICharacter[];
	private paginationPages: Object;

	constructor(private readonly starwarsService: StarwarsService) {}

	ngOnInit() {
		this.starwarsService.getCharacters(3).subscribe((response) => console.log(response));
	}
}
