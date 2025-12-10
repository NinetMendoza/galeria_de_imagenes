import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.css'],
})
export class UploadPostComponent {
  uploadForm: FormGroup;
  loading = false;
  submitted = false;
  preview: string | null = null;
  selectedFile: File | null = null;
  error = '';
  success = '';

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private router: Router
  ) {
    this.uploadForm = this.formBuilder.group({
      caption: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(file);
      this.error = '';
    } else {
      this.error = 'Por favor selecciona una imagen válida';
      this.selectedFile = null;
      this.preview = null;
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.uploadForm.invalid || !this.selectedFile) {
      if (!this.selectedFile) {
        this.error = 'Debes seleccionar una imagen';
      }
      return;
    }

    this.loading = true;
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('caption', this.uploadForm.get('caption')?.value);

    this.uploadService.uploadPost(formData).subscribe(
      () => {
        this.success = '¡Publicación subida exitosamente!';
        this.uploadForm.reset();
        this.preview = null;
        this.selectedFile = null;
        this.submitted = false;
        setTimeout(() => {
          this.router.navigate(['/feed']);
        }, 2000);
      },
      (error) => {
        this.error = 'Error al subir la publicación';
        this.loading = false;
      }
    );
  }
}
