import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreService } from '../../services/explore.service';
import { Post, User } from '../../../core/models/models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-explore-view',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './explore-view.component.html',
  styleUrl: './explore-view.component.css',
})
export class ExploreViewComponent implements OnInit {
  trendingPosts: Post[] = [];
  suggestedUsers: User[] = [];
  searchQuery: string = '';

  constructor(
    private exploreService: ExploreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTrendingPosts();
    this.loadSuggestedUsers();
  }

  loadTrendingPosts(): void {
    this.exploreService.getTrendingPosts().subscribe(posts => {
      this.trendingPosts = posts;
      this.cdr.detectChanges();
    });
  }

  loadSuggestedUsers(): void {
    this.exploreService.getSuggestedUsers().subscribe(users => {
      this.suggestedUsers = users;
      this.cdr.detectChanges();
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    // Implementar búsqueda cuando se integre backend
  }

  followUser(user: User): void {
    console.log('Siguiendo a', user.username);
    // Implementar follow cuando se integre backend
  }
}
