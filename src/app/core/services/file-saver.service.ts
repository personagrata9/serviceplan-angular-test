import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from 'src/app/gallery/components/item/item.model';

@Injectable({
  providedIn: 'root',
})
export class FileSaverService {
  constructor(private http: HttpClient) {}

  public checkIsDownloadPossible = (item: IItem): boolean =>
    item.height >= 2000 && item.width >= 2000;

  public downloadImage = (item: IItem): Observable<Blob> => {
    return this.http.get(item.download_url, {
      responseType: 'blob',
    });
  };
}
