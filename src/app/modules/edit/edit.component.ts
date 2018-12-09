import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StarwarsService } from '../services/starwars.service/starwars.service';
import { EditDataService } from '../services/edit-data.service/edit-data.service'

import { FormComponent } from '../shared/components/form/form.component';
import { ICharacter } from '../shared/models/i-character';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

 	public submitting: boolean = false;
	public species: String[];
	public editedCharacter: ICharacter;

	constructor(
		private readonly starwarsService: StarwarsService,
		private readonly editDataService: EditDataService,
		private readonly router: Router
	) { }

	ngOnInit() {
		this.starwarsService.getSpecies().subscribe(species => this.species = species);
		this.editDataService.data.subscribe(editedData => {
			if(!editedData) {
				this.router.navigate(['/list-view']);
			} else {
				this.editedCharacter = editedData
			}
		});
	}

	public editCharacter(form: ICharacter) {
		this.submitting = true;
		this.starwarsService.editCharacter(this.editedCharacter.id, form).subscribe(
			val => console.log(val),
			error => {
				console.log(error)
				this.submitting = false;
				this.router.navigate(['/list-view']);
			},
			() => {
				this.submitting = false;
				alert(this.editedCharacter.name + " edited!")
				this.router.navigate(['/list-view']);
			}
		);

	}

	public cancel() {
		this.router.navigate(['/list-view']);
	}
}
