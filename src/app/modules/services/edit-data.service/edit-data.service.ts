import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ICharacter } from '../../shared/models/i-character'

@Injectable({
	providedIn: 'root'
})
export class EditDataService {

	private dataSource: BehaviorSubject<ICharacter> = new BehaviorSubject<ICharacter>(null);
	data = this.dataSource.asObservable();

	constructor() { }

	public updateEditedData(data: ICharacter){
		this.dataSource.next(data);
	}
}
