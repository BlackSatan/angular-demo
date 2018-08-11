import { Component, OnInit, Input } from '@angular/core';
import { UsersService, ICardAlias } from '../user.service';
import { Payment } from './payment';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.sass']
})
export class UserPaymentComponent implements OnInit {
  private _cards: ICardAlias[];

  private submitting: boolean = false;

  model = new Payment('', 0, '');

  constructor(private usersService: UsersService) {}

  @Input()
  set cards(cards: ICardAlias[]) {
    console.log(cards);
    this._cards = cards;
  }

  @Input() pid: string;

  public showImage: boolean = true;
  submitForm() {
    if (this.submitting) {
      return;
    }
    this.submitting = true;
    this.usersService.submitPayment({
      profileId: this.pid,
      pin: this.model.password,
      alias: this.model.card,
      amount: this.model.amount,
    }).subscribe(() => {
      this.submitting = false;
      this.showImage = false;
    }, err => {
      this.submitting = false;
      alert(err);
    });
  }

  ngOnInit() {
  }

}
