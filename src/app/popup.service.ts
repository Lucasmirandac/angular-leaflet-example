import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCapitalPopups(data: any): string {
    var nf = Intl.NumberFormat();
    return `` +
    `<div>Capital: ${data.properties.name}</div>` +
    `<div>State: ${data.properties.state}</div>` +
    `<div>Population: ${nf.format(data.properties.population)}</div>`;
  }
}
