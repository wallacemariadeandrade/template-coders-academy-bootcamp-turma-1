import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import RegisterUser from 'app/model/registerUser';
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

  /**
   * addToFavorite
   * A API não retorna dados nesse caso, então o retorno do método foi
   * declarado como any (qualquer coisa); também não recebe dados, por isso
   * foi passado null no segundo argumento
   */
  public addToFavorite(id:string, musicId:string):Observable<any> {
    return this.http.post(`${environment.baseUrl}/User/${id}/favorite-music/${musicId}`, null);
  }

  /**
   * getUser
   */
  public getUser(id):Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/User/${id}`);
  }

  public registerUser(user: RegisterUser):Observable<RegisterUser> {
    return this.http.post<RegisterUser>(`${environment.baseUrl}/User/Register`, user);
  }
}
