import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Shared
import { IList } from '../shared/types/types';

// Component Ref
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TileComponent],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss'
})
export class CocktailListComponent {
  public httpClient = inject(HttpClient);
  public cocktailList: IList[] = [];
  public filteredCocktailList: IList[] = [];
  public search: string;

  ngOnInit(): void {
    this.httpClient.get<IList[]>('/cockails')
      .subscribe({
        next: (data: IList[]) => {
          this.cocktailList = data;
          this.filteredCocktailList = data;
        }, error: (err) => console.error(err)
      });
  }

  public filterData(ev: Event): void {
    const text: string = (ev.target as HTMLInputElement).value;
    if (!text) {
      this.filteredCocktailList = this.cocktailList;
      return;
    }

    this.filteredCocktailList = this.cocktailList.filter(
      item => item?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
