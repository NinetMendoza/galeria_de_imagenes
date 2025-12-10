import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedService } from '../../services/saved.service';
import { Post } from '../../../core/models/models';

@Component({
  selector: 'app-saved-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-view.component.html',
  styleUrl: './saved-view.component.css',
})
export class SavedViewComponent implements OnInit {
  savedPosts: Post[] = [];
  isLoading = true;

  constructor(
    private savedService: SavedService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSavedPosts();
  }

  loadSavedPosts(): void {
    this.isLoading = true;
    this.savedService.getSavedPosts().subscribe(posts => {
      this.savedPosts = posts;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  removeSavedPost(postId: string): void {
    this.savedService.unsavePost(postId).subscribe(() => {
      this.savedPosts = this.savedPosts.filter(p => p.id !== postId);
    });
  }
}
