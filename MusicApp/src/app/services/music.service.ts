import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Album from 'app/model/album';
import { Observable } from 'rxjs';
import { environment } from "environments/environment";
 
@Injectable({
  providedIn: 'root'
})
export class MusicService {

  // HttpClient é uma classe para chamadas HTTP
  constructor(private http:HttpClient) { }

  /**
   * getAlbuns chama a API de albuns
   */
  public getAlbuns():Observable<Album[]> {
    return this.http.get<Album[]>(`${environment.baseUrl}/album`);
  }
}
