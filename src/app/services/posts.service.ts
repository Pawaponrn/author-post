import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../types/post.type';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  http = inject(HttpClient)

  constructor() { }

  getPosts() {
    return this.http.get<Post[]>(`${environment.apiUrl}/json/posts.json`)
  }
}
