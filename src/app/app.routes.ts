import { Routes } from '@angular/router';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { CocktailDetailsComponent } from './cocktail-details/cocktail-details.component';

export const routes: Routes = [
    { path: 'cocktail-list', component: CocktailListComponent },
    { path: 'cocktail-details/:id', component: CocktailDetailsComponent },
    { path: '', redirectTo: '/cocktail-list', pathMatch: 'full' },
    { path: '**', component: CocktailListComponent }
];
