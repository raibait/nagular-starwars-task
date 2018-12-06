export interface IPaginatorData {
    pages: number[];
	prevEnabled?: boolean;
	nextEnabled?: boolean;
    firstPage?: number;
    lastPage?: number;
    currentPage?: number;
}