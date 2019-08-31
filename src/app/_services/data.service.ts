import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import Users from '../../assets/dummy/users.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private readonly units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  private readonly users: any[] = Users;

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

  getUser(userId: number, userType: string) {
    return this.users.filter(u => u.index === userId && u.userType === userType)[0];
  }

  paginate(items, pageno, per_page) {
    var page = pageno,
      per_page = per_page,
      offset = (page - 1) * per_page,
      paginatedItems = items.slice(offset).slice(0, per_page),
      total_pages = Math.ceil(items.length / per_page);
    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: (total_pages > page) ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems
    };
  }


}
