import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Author } from '../types/author.type';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  http = inject(HttpClient)

  getAuthors() {
    return this.http.get<Author[]>(`${environment.apiUrl}/json/authors.json`)
  }
}
