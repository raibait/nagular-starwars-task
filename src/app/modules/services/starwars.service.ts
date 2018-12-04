import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ICharacter } from '../shared/models/i-character'


@Injectable({
	providedIn: 'root'
})
export class StarwarsService {
	private readonly starwarsApiUrl = 'http://localhost:3000';

	constructor(private readonly http: HttpClient) { }

	public getCharacters(): Observable<ICharacter[]> {
		return this.http.get<ICharacter[]>(`${this.starwarsApiUrl}/characters`);
	}

	public getSpecies(): Observable<String[]> {
		return this.http.get<String[]>(`${this.starwarsApiUrl}/species`);
	}
}
