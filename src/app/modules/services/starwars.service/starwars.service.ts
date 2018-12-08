import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { ICharacter } from '../../shared/models/i-character'
import { PaginatorService } from '../paginator.service/paginator.service';


@Injectable({
	providedIn: 'root'
})
export class StarwarsService {
	private readonly starwarsApiUrl = 'http://localhost:3000';

	constructor(
		private readonly http: HttpClient,
		private readonly paginatorService: PaginatorService
	) { }

	public getCharacters(page, filter = ''): Observable<ICharacter[]> {
		return this.http.get<ICharacter[]>(`
			${this.starwarsApiUrl}/characters?_page=${page}&q=${filter}`, { observe: 'response' }).pipe(
			debounceTime(200),
			map((resp) => {
				let link = resp.headers.get("Link");

				if(link !== "") {
					let newPages = {};
					link.split(',').map((val) => {
						let page = +val.slice(0, val.indexOf(';')).replace(`${this.starwarsApiUrl}/characters?_page=`,'').match(/\d+/)[0];
						let key = val.split(/"/)[1];

						newPages={
							...newPages,
							[key]: page
						}
					});
					this.paginatorService.setPages(page, newPages);
				}else{
					this.paginatorService.setPages(page, null);
				}
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

	public deleteCharacter(id: number): Observable<HttpResponse<Object>> {
		return this.http.delete(`${this.starwarsApiUrl}/characters/${id}`,  { observe: 'response' });
	}
}
