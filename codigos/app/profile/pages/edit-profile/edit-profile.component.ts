import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/models';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  currentUser: User | null = null;
  loading = false;
  submitted = false;
  error = '';
  success = '';
  profileImagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      bio: ['', [Validators.maxLength(150)]],
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.editForm.patchValue({
        username: this.currentUser.username,
        bio: this.currentUser.bio,
      });
      this.profileImagePreview = this.currentUser.profileImage;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    if (!this.currentUser) {
      return;
    }

    this.loading = true;
    const formData = new FormData();
    formData.append('username', this.editForm.get('username')?.value);
    formData.append('bio', this.editForm.get('bio')?.value);
    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }

    this.profileService.updateProfile(this.currentUser.id, formData).subscribe(
      () => {
        this.success = '¡Perfil actualizado exitosamente!';
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
      },
      (error) => {
        this.error = 'Error al actualizar el perfil';
        this.loading = false;
      }
    );
  }
}
