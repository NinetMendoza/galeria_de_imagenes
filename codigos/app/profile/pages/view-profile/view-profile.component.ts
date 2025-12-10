import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { User, Post } from '../../../core/models/models';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  user: User | null = null;
  userPosts: Post[] = [];
  loading = true;
  isFollowing = false;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.loadProfile(currentUser.id);
    }
  }

  loadProfile(userId: string): void {
    this.loading = true;
    this.profileService.getUserProfile(userId).subscribe(
      (user) => {
        this.user = user;
        this.cdr.detectChanges();
        this.loadUserPosts(userId);
      },
      (error) => {
        console.error('Error loading profile:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    );
  }

  loadUserPosts(userId: string): void {
    this.profileService.getUserPosts(userId).subscribe(
      (posts) => {
        this.userPosts = posts;
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

  toggleFollow(): void {
    if (!this.user) return;

    if (this.isFollowing) {
      this.profileService.unfollowUser(this.user.id).subscribe(
        () => {
          this.isFollowing = false;
          if (this.user) {
            this.user.followers -= 1;
          }
        },
        (error) => console.error('Error unfollowing:', error)
      );
    } else {
      this.profileService.followUser(this.user.id).subscribe(
        () => {
          this.isFollowing = true;
          if (this.user) {
            this.user.followers += 1;
          }
        },
        (error) => console.error('Error following:', error)
      );
    }
  }
}
