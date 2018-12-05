import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICharacter } from '../shared/models/i-character'


@Injectable({
	providedIn: 'root'
})
export class StarwarsService {
	private readonly starwarsApiUrl = 'http://localhost:3000';

	link: string[];

	constructor(private readonly http: HttpClient) { }

	public getCharacters(page): Observable<ICharacter[]> {
		return this.http.get<ICharacter[]>(`${this.starwarsApiUrl}/characters?_page=${page}`, { observe: 'response' }).pipe(
			map((resp) => {
				this.link = resp.headers.get("Link").split(',').map((val) => {
					let link = val.slice(0, val.indexOf(','))
					let key = val.slice(0, val.indexOf(','))
					return val;
				});
				console.log((this.link));
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
