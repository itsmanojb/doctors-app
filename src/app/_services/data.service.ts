import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private readonly units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  constructor(
    private http: Http,
  ) { }

  externalGetAPICall(url: string, json = true): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res) => json ? resolve(res.json()) : resolve(res),
        (err) => reject(err)
      )
    })
  }

  niceBytes(x: string): string {
    if (x === 'n/a') {
      return 'File size unknown';
    }
    let l = 0, n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + this.units[l]);
  }


}
