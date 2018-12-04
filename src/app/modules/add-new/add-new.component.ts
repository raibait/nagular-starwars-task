import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';

import { Validators, NgForm, NgControl } from '@angular/forms';


import { StarwarsService } from '../services/starwars.service';

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

	private controls: NgControl[];

	public speciesArr: String[];

	constructor(private readonly starwarsService: StarwarsService) { }

	ngOnInit() {
		this.controls= [this.name, this.species, this.gender];
		this.starwarsService.getSpecies().subscribe(species => this.speciesArr = species);
	}

	public submitForm() {
		if(this.form.valid){
			console.log('valid')
		} else {
			this.speciesFocus.nativeElement.focus();
			console.log(!this.form.controls.gender.valid && this.form.submitted);
			console.log(this.form);
		}

	}
}
