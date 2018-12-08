import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgControl } from '@angular/forms';

import { StarwarsService } from '../services/starwars.service/starwars.service';

@Component({
	selector: 'add-new',
	templateUrl: './add-new.component.html',
	styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

	@ViewChild('form') form: NgForm;
	//@ViewChild('name') name: NgControl;
	//@ViewChild('species') species: NgControl;
	//@ViewChild('gender') gender: NgControl;

	public speciesArr: String[];
	public submitting: boolean = false;
	@Input() name: string = 'asd';
	@Input() species: string = 'Aleena';
	@Input() gender: string = 'male';
	@Input() homeworld: string = "Słupsk"

	constructor(
		private readonly starwarsService: StarwarsService,
		private readonly router: Router
	) { }

	ngOnInit() {
		this.starwarsService.getSpecies().subscribe(species => this.speciesArr = species);

	}

	public submitForm() {
		console.log(this.form)
		if(this.form.valid){
			this.submitting = false
			this.starwarsService.addCharacter(this.form.value).subscribe(
				val => console.log(val),
				error => {
					console.log(error)
					this.submitting = false
				},
				() => this.submitting = false
			);
			this.router.navigate(['/list-view']);
		} else {
			let invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
			invalidFields[1].focus();
		}
	}

	public cancel() {
		this.router.navigate(['/list-view']);
	}
}
