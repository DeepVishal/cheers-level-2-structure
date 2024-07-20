import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Shared
import { ShareDetailsService } from '../shared/services/share-details.service';
import { IList } from '../shared/types/types';

// Component Ref
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TileComponent],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.scss'
})
export class CocktailDetailsComponent {
  public httpClient = inject(HttpClient);

  public details: IList;
  public favList: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: ShareDetailsService
  ) { }

  ngOnInit(): void {
    this.getDetails();
    this.getList();
  }

  public getDetails(): void {
    let id: number = 0;

    try {
      id = Number(this.route.snapshot.paramMap.get('id'));
    } catch (e) {
      id = 11014;
    }
    this.httpClient.get<IList>(`/cockails/${id}`)
      .subscribe({
        next: (data: IList) => {
          this.details = data;
        }, error: (err) => console.error(err)
      });
  }

  public goBack(): void {
    this.location.back();
  }

  public toggleFav(id: string): void {
    this.favList = this.service.toggleFavouritesItem(id) || [];
  }

  private getList(): void {
    this.favList = this.service.getFavouritesList() || [];
  }
}
