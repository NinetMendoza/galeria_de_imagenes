import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, REACTION_EMOJIS, ReactionType } from '../../../core/models/models';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
})
export class PostItemComponent {
  @Input() post!: Post;
  @Input() isSaved = false;

  showReactionPicker = false;
  reactionTypes: ReactionType[] = ['like', 'love', 'wow', 'sad', 'angry'];
  reactionEmojis = REACTION_EMOJIS;

  toggleReactionPicker(): void {
    this.showReactionPicker = !this.showReactionPicker;
  }

  addReaction(type: ReactionType): void {
    if (!this.post.reactions) {
      this.post.reactions = [];
    }
    
    const existingReaction = this.post.reactions.find(r => r.userId === 'currentUser');
    if (existingReaction) {
      existingReaction.type = type;
    } else {
      this.post.reactions.push({
        id: `reaction-${Date.now()}`,
        postId: this.post.id,
        userId: 'currentUser',
        user: {
          id: 'currentUser',
          username: 'you',
          email: 'user@example.com',
          profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
          bio: '',
          followers: 0,
          following: 0,
          createdAt: new Date(),
        },
        type,
        createdAt: new Date(),
      });
    }
    this.post.likes++;
    this.showReactionPicker = false;
  }

  toggleSavePost(): void {
    this.isSaved = !this.isSaved;
  }

  getReactionCount(type: ReactionType): number {
    return this.post.reactions?.filter(r => r.type === type).length || 0;
  }

  // Para iterar sobre tipos en el template sin problemas de tipos
  getReactionSummary(): Array<{type: ReactionType, count: number}> {
    const summary: Array<{type: ReactionType, count: number}> = [];
    for (const type of this.reactionTypes) {
      const count = this.getReactionCount(type);
      if (count > 0) {
        summary.push({ type, count });
      }
    }
    return summary;
  }

  getUserReaction(): ReactionType | null {
    const userReaction = this.post.reactions?.find(r => r.userId === 'currentUser');
    return userReaction?.type || null;
  }

  getReactionEmoji(type: ReactionType): string {
    return this.reactionEmojis[type];
  }

  likePost(): void {
    this.addReaction('like');
  }

  toggleComments(): void {
    // Implementar toggle de comentarios
  }
}