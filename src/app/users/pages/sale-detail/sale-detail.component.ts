import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Sale } from '../../interfaces/sale.interface';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {

  public currentSale!: Sale;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({orderNumber}) => {
      if(orderNumber) {
        this.userService.getSaleByOrderNumber(orderNumber).subscribe(response => {
          this.currentSale = response;
        })

      }
    })
  }

}
