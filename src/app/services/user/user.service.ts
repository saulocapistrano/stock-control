import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfacce/user/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfacce/user/auth/AuthResponse';
import { CreateUserRequest } from 'src/app/models/interfacce/user/CreateUserRequest';
import { CreateUserResponse } from 'src/app/models/interfacce/user/CreateUserResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' // deixa injetar em qualquer classe
})
export class UserService {

  private API_URL = environment.API_URL

  constructor(private http: HttpClient ) { }

  createUser(requestDatas: CreateUserRequest): Observable<CreateUserResponse>{
    return this.http.post<CreateUserResponse>(
      `${this.API_URL}/user`, requestDatas
    )
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(
      `${this.API_URL}/auth`, requestDatas
    )
  }

}
