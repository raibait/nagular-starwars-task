import { Injectable } from '@angular/core';

import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PaginatorService {

	constructor() { }

	private currentPage: Number;
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

	public getPages() {
		return of({
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
		});
	}

}
