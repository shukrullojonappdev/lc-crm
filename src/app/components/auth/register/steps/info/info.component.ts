import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {
  phone: string = '';
  fullname: string = '';
  password: string = '';
  btnLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.phone = this.route.snapshot.params['phone'];
  }

  setInfo() {
    this.btnLoading = true;
    this.authService
      .createUser({
        phone: this.phone,
        full_name: this.fullname,
        password: this.password
      })
      .subscribe((_) => {
        this.btnLoading = false;
        this.router.navigate(['/auth/login']);
      });
  }
}
