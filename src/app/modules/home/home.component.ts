import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject, of, takeUntil, zip } from 'rxjs';
import { AuthorsService } from 'src/app/services/authors.service';
import { PostsService } from 'src/app/services/posts.service';
import { Author } from 'src/app/types/author.type';
import { Post } from 'src/app/types/post.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  authorSvc = inject(AuthorsService)
  postSvc = inject(PostsService)

  notifier = new Subject<void>()
  timezone = ''

  postWithAuthorList: Post[] = []

  ngOnInit(): void {
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    zip(this.postSvc.getPosts(), this.authorSvc.getAuthors()).subscribe(([posts, authors]) => {
      this.postWithAuthorList = posts.map(post => {
        const postAuthor = authors.find(author => post.author_id == author.id)
        return {
          ...post,
          author: postAuthor
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }
}
