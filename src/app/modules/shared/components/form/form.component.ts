import { Component, OnInit, Input,Output, ViewChild, EventEmitter } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ICharacter } from '../../models/i-character'

@Component({
	selector: 'character-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	@ViewChild('form') form: NgForm;

	@Input() formDisabled: boolean = false;
	@Input() speciesArr: String[];
	@Input() editedCharacter: ICharacter = {id: null, name: null, species: null, gender: null, homeworld: null};

	@Output() formSubmit: EventEmitter<ICharacter> = new EventEmitter();
	@Output() cancel: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit() { }

	public submitForm() {
		if(this.form.valid){
			this.formSubmit.emit(this.form.value)
		} else {
			let invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
			invalidFields[1].focus();
		}
	}

	public cancelHandler() {
		if(!this.form.dirty || (this.form.dirty && confirm("Are you sure want to discard changes?"))) {
			this.cancel.emit();
		}
	}

}
