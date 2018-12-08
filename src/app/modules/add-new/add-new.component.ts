import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StarwarsService } from '../services/starwars.service/starwars.service';

import { FormComponent } from '../shared/components/form/form.component';
import { ICharacter } from '../shared/models/i-character';

@Component({
	selector: 'add-new',
	templateUrl: './add-new.component.html',
	styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

	public submitting: boolean = false;
	public species: String[];

	constructor(
		private readonly starwarsService: StarwarsService,
		private readonly router: Router
	) { }

	ngOnInit() {
		this.starwarsService.getSpecies().subscribe(species => this.species = species);

	}

	public addCharacter(form: ICharacter) {
		this.submitting = true;
		this.starwarsService.addCharacter(form).subscribe(
			val => console.log(val),
			error => {
				console.log(error)
				this.submitting = false
			},
			() => this.submitting = false
		);
		this.router.navigate(['/list-view']);
	}

	public cancel() {
		this.router.navigate(['/list-view']);
	}
}
