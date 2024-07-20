import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDetailsService {

  constructor() { }

  public setFavouritesList(list: string[]): void {
    sessionStorage.setItem('favList', JSON.stringify(list));
  }

  public getFavouritesList(): string[] | null {
    return JSON.parse(sessionStorage.getItem('favList') as string);
  }

  public toggleFavouritesItem(id: string): string[] | null {
    let details = this.getFavouritesList() || [];

    if (details.includes(id)) {
      details = details.filter(el => el !== id);
    } else {
      details = [...details, id];
    }
    this.setFavouritesList(details);
    
    return this.getFavouritesList();
  }
}
