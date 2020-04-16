import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  _url = "http://localhost:3000/enroll";

  register(userData) {
    return this.http.post<any>(this._url, userData);
  }
}
