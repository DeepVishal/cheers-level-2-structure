import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

// Shared
import { ShareDetailsService } from '../shared/services/share-details.service';
import { IList } from '../shared/types/types';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {
  @ViewChild('star') star: ElementRef
  @Input() detail: IList;

  public favList: string[] = [];

  constructor(
    private service: ShareDetailsService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  public toggleFav(id: string): void {
    this.favList = this.service.toggleFavouritesItem(id) || [];
  }

  private getList(): void {
    this.favList = this.service.getFavouritesList() || [];
  }

}
