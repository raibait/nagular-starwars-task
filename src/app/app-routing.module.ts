import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListViewComponent } from './modules/list-view/list-view.component';
import { AddNewComponent } from './modules/add-new/add-new.component';
import { EditComponent } from './modules/edit/edit.component';

const routes: Routes = [
	{
		path: 'list-view',
		component: ListViewComponent
	},
	{
		path: 'add-new',
		component: AddNewComponent
	},
	{
		path: 'edit/:id',
		component: EditComponent
	},
	{
		path: '',
		redirectTo: '/list-view',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: '/list-view',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
