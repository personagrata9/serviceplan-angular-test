import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from '../components/card/item.model';

@Injectable()
export class PicsumService {
  private readonly API_URL: string = 'https://picsum.photos/v2/list';

  constructor(private http: HttpClient) {}

  public getItems = (page: number, limit: number): Observable<IItem[]> => {
    const options = {
      params: new HttpParams({
        fromObject: {
          page,
          limit,
        },
      }),
    };
    return this.http.get<IItem[]>(this.API_URL, options);
  };
}
