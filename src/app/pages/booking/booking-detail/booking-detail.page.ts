import { NavControllerService } from './../../../services/navcontroller-service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.page.html',
  styleUrls: ['./booking-detail.page.scss'],
})
export class BookingDetailPage implements OnInit {
  paymentPage: boolean = false;
  cart: any;
  date_format: any;
  cart_createdCode = [];
  new_date = moment(new Date()).format("DD/MM/YYYY HH:MM")
  constructor(
    private navCrl: NavControllerService
  ) {

    if (this.navCrl.get("paymentPage") != undefined)
      this.paymentPage = this.navCrl.get("paymentPage");
    if (this.navCrl.get("cart") != undefined) {
      this.cart = this.navCrl.get("cart");
      this.date_format = moment(this.cart.date).format('DD-MM-YYYY');
      if (this.cart.customer_group == 1) {
        this.cart_createdCode.push({
          ticket_price: this.cart.total,
          company_name: 'Suối Tiên',
          ticket_name: 'Vé tour tham quan Suối Tiên',
          ticket_type: 'Vé đoàn',
          ticket_adult_quantity: this.cart.adult_quantity,
          ticket_child_quantity: this.cart.child_quantity,
          ticket_customer: this.cart.full_name,
          ticket_id: this.cart.id,
          ticket_date: this.cart.date,
          ticket_state: 'Chưa xác nhận',
        });
      }
      else {
        let i = 0;
        for (let index = 0; index < this.cart.adult_quantity; index++) {
          i++;
          this.cart_createdCode.push({
            ticket_price: this.cart.adult_price,
            company_name: 'Suối Tiên',
            ticket_name: 'Vé tour tham quan Suối Tiên',
            ticket_type: 'Vé người lớn',
            ticket_customer: this.cart.full_name,
            ticket_id: this.cart.id + '-' + i,
            ticket_date: this.cart.date,
            ticket_state: 'Chưa xác nhận',
          });

        }
        for (let index = 0; index < this.cart.child_quantity; index++) {
          i++;
          this.cart_createdCode.push({
            company_name: 'Suối Tiên',
            ticket_name: 'Vé tour tham quan Suối Tiên',
            ticket_price: this.cart.child_price,
            ticket_type: 'Vé trẻ em (100cm - 140cm)',
            ticket_customer: this.cart.full_name,
            ticket_id: this.cart.id + '-' + i,
            ticket_date: this.cart.date,
            ticket_state: 'Chưa xác nhận'
          });

        }
      }
      console.log(this.cart_createdCode);
    }
    this.date_format = moment(this.cart.date).format("DD-MM-YYYY");
  }

  ngOnInit() {
  }

  paymentPage_onBack() {
    this.navCrl.pop("tabs/home");
  }
  convert_QRCode(code) {
    return JSON.stringify(code);
  }
}
