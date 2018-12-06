import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICharacter } from '../shared/models/i-character'
import { PaginatorService } from './paginator.service';


@Injectable({
	providedIn: 'root'
})
export class StarwarsService {
	private readonly starwarsApiUrl = 'http://localhost:3000';



	constructor(
		private readonly http: HttpClient,
		private readonly paginatorService: PaginatorService
	) { }

	public getCharacters(page): Observable<ICharacter[]> {
		return this.http.get<ICharacter[]>(`${this.starwarsApiUrl}/characters?_page=${page}`, { observe: 'response' }).pipe(
			map((resp) => {
				let newPages = {};
				resp.headers.get("Link").split(',').map((val) => {
					let page = +val.slice(0, val.indexOf(';')).replace(`${this.starwarsApiUrl}/characters?_page=`,'').match(/\d+/)[0];
					let key = val.split(/"/)[1];

					newPages={
						...newPages,
						[key]: page
					}
				});
				this.paginatorService.setPages(page, newPages);
				return resp.body;
			})
		);

	}

	public getSpecies(): Observable<String[]> {
		return this.http.get<String[]>(`${this.starwarsApiUrl}/species`);
	}

	public addCharacter(payload: ICharacter) {
		return this.http.post(`${this.starwarsApiUrl}/characters`, payload);
	}
}
