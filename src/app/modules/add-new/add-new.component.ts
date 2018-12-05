import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm, NgControl } from '@angular/forms';


import { StarwarsService } from '../services/starwars.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
	selector: 'add-new',
	templateUrl: './add-new.component.html',
	styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

	@ViewChild('form') form: NgForm;
	@ViewChild('name') name: NgControl;
	@ViewChild('species') species: NgControl;
	@ViewChild('gender') gender: NgControl;
	@ViewChild('nameFocus') nameFocus: ElementRef;
	@ViewChild('speciesFocus') speciesFocus: ElementRef;
	@ViewChild('genderFocus') genderFocus: ElementRef;


	private controls: ElementRef[];

	public speciesArr: String[];

	constructor(
		private readonly starwarsService: StarwarsService,
		private readonly router: Router
	) { }

	ngOnInit() {
		this.controls= [this.nameFocus, this.speciesFocus, this.genderFocus];
		this.starwarsService.getSpecies().subscribe(species => this.speciesArr = species);
	}

	public submitForm() {
		if(this.form.valid){
			console.log(this.form.value);
			this.starwarsService.addCharacter(this.form.value).subscribe(val=>console.log(val));
		} else {
			let invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
			invalidFields[1].focus();
		}
	}

	public goBack() {
		console.log('click')
		this.router.navigate(['/list-view']);
	}
}
