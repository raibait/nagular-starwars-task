import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';

import { IPaginatorData } from '../../shared/models/i-paginator-data'

@Injectable({
	providedIn: 'root'
})
export class PaginatorService {

	constructor() { }

	private currentPage: number;
	private paginationPages: {
		first?: number
		prev?: number
		next?: number
		last?: number
	};

	public setPages(currentPage: number, paginationPages) {
		this.currentPage = currentPage;
		this.paginationPages = paginationPages;
	}

	public getPages(): Observable<IPaginatorData> {

		return this.paginationPages? of({
			pages: [
				this.paginationPages.prev,
				this.currentPage,
				this.paginationPages.next
			].filter(el => el !== undefined),
			prevEnabled: this.paginationPages.prev? true: false,
			nextEnabled:  this.paginationPages.next? true: false,
			firstPage: this.paginationPages.first,
			lastPage: this.paginationPages.last,
			currentPage: this.currentPage
		}): of(null);
	}

}
