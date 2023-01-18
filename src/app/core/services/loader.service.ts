import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = false;

  public setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  public getLoading = (): boolean => {
    return this.loading;
  };
}
