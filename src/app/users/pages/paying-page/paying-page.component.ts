import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paying-page',
  templateUrl: './paying-page.component.html',
  styleUrls: ['./paying-page.component.css']
})
export class PayingPageComponent {

  constructor(private router: Router) {}

  paying: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.paying = false;
      this.router.navigate(['/user/sale']);
    }, 3000);
  }

  stopShowing() {
    this.paying = true;
  }

}
