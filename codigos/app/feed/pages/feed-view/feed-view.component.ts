import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedService } from '../../services/feed.service';
import { Post } from '../../../core/models/models';
import { PostItemComponent } from '../../components/post-item/post-item.component';

@Component({
  selector: 'app-feed-view',
  standalone: true,
  imports: [CommonModule, PostItemComponent],
  templateUrl: './feed-view.component.html',
  styleUrls: ['./feed-view.component.css'],
})
export class FeedViewComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error = '';

  constructor(
    private feedService: FeedService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    // Usar el servicio con mock data
    this.feedService.getPosts().subscribe(
      (response) => {
        this.posts = response.posts;
        this.loading = false;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error loading posts:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    );
  }
}
