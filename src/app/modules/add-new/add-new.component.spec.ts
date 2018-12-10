import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AddNewComponent } from './add-new.component';

import { StarwarsService } from '../services/starwars.service/starwars.service';

import { of } from 'rxjs';
import { throwError } from 'rxjs';

import { ICharacter } from '../shared/models/i-character';

fdescribe('AddNewComponent', () => {
	let component: AddNewComponent;
	let fixture: ComponentFixture<AddNewComponent>;

	let mockRouter: Router;
	let mockStarwarsService;
	let fakeCharacter: ICharacter;
	let fakeSpecies: string [];


	beforeEach(() => {
		mockRouter = jasmine.createSpyObj('mockRouter', {
			navigate: true
		});

		mockStarwarsService = jasmine.createSpyObj('mockStarwarsService', [
			'getSpecies',
			'addCharacter'
		]);

		fakeCharacter = {
			id: 1,
			name: 'fakeName',
			species: 'fakeSpecies',
			gender: 'fakeGender',
			homeworld: 'fakeHomeworld'
		};

		fakeSpecies = ['species1', 'species2'];
	});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ AddNewComponent ],
		providers: [
			{ provide: StarwarsService , useValue: mockStarwarsService },
			{ provide: Router , useValue: mockRouter },
		],
		schemas: [NO_ERRORS_SCHEMA]
		})
		.compileComponents().then(() => {
			fixture = TestBed.createComponent(AddNewComponent);
			component = fixture.componentInstance;
		});
	}));

	describe('Component on init.', () => {

		describe('Fetching species data success.', () => {
			beforeEach(() => {
				mockStarwarsService.getSpecies.and.returnValue(of(fakeSpecies));
			});

			it('Should call starwars service for available species.', () => {
				component.ngOnInit();
				expect(mockStarwarsService.getSpecies).toHaveBeenCalled();
			});

			it('Should set fetched species.', () => {
				component.ngOnInit();
				expect(component.species).toEqual(fakeSpecies);
			});
		});

		describe('Fetching species data failure.', () => {
			beforeEach(() => {
				mockStarwarsService.getSpecies.and.returnValue(throwError({ status: '404' }));
			});

			it('Should handle error.', () => {
				spyOn(component,'handleError')
				component.ngOnInit();
				expect(component.handleError).toHaveBeenCalled();
			});
		});

	});

	describe('Submitting new character.', () => {

		describe('Submiting success.', () => {
			beforeEach(() => {
				mockStarwarsService.addCharacter.and.returnValue(of(true));
			});

			it('Should call starwars service with passed character data.', () => {
				component.addCharacter(fakeCharacter);
				expect(mockStarwarsService.addCharacter).toHaveBeenCalledWith(fakeCharacter);
			});

			it('Should navigate to list view on sumbit success.', () => {
				component.addCharacter(fakeCharacter);
				expect(mockRouter.navigate).toHaveBeenCalledWith(['/list-view']);
			});

			it('Should set submitting to false on sumbit success.', () => {
				component.submitting = true;
				component.addCharacter(fakeCharacter);
				expect(component.submitting).toEqual(false);
			});
		});

		describe('Submiting failed.', () => {
			beforeEach(() => {
				spyOn(component,'handleError')
				component.submitting = true;
				mockStarwarsService.addCharacter.and.returnValue(throwError({ status: '404' }));
			});

			it('Should set submitting to false on sumbit failure.', () => {
				component.submitting = true;
				component.addCharacter(fakeCharacter);
				expect(component.submitting).toEqual(false);
			});

			it('Should handle error.', () => {
				component.addCharacter(fakeCharacter);
				expect(component.handleError).toHaveBeenCalled();
			});
		});
	});

	describe('Resigning.', () => {
		it('Should navigate to list view on cancel.', () => {
			component.cancel();
			expect(mockRouter.navigate).toHaveBeenCalledWith(['/list-view']);
		});
	});





});
