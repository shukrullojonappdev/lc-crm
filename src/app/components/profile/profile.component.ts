import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { StudentsService } from 'src/app/service/students.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  student: any;

  updateProfileForm = this.fb.group({
    id: ['', Validators.required],
    git_username: ['', Validators.required],
    git_token: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.student =
      JSON.parse(localStorage.getItem('currentUser')) ||
      JSON.parse(sessionStorage.getItem('currentUser'));
  }

  update() {
    this.updateProfileForm.controls['id'].setValue(this.student.user.id);
    if (!this.updateProfileForm.valid) return;
    this.studentsService
      .updateStudent(this.updateProfileForm.value as any)
      .subscribe((res) => {
        this.authService.setCurrentUser();

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: $localize`Git info added`
        });
      });
  }
}
