import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.scss'],
})
export class MonedasComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.testToken().subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error(error);
      },
    });
  }
}
