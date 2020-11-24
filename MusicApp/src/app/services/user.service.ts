import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SignIn from 'app/model/signIn';
import { User } from 'assets/angular-material-examples/autocomplete-display/autocomplete-display-example';
import { environment } from "environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public authenticate(payload:SignIn):Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/User/authenticate`, payload);
  }

  /**
   * removeFromFavorite
   * A API não retorna dados nesse caso, então o retorno do método foi
   * declarado como any (qualquer coisa)
   */
  public removeFromFavorite(id:string, musicId:string):Observable<any>  {
    return this.http.delete(`${environment.baseUrl}/User/${id}/favorite-music/${musicId}`);
  }
}
