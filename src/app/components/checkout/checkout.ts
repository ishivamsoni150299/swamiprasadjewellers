import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CartService, CartItem } from '../../services/cart.service';
import { NgxBarcode6Module } from 'ngx-barcode6';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    QRCodeComponent,
    NgxBarcode6Module
  ],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout {
  private cartService = inject(CartService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  checkoutForm: FormGroup;
  cartItems$: Observable<CartItem[]> = this.cartService.cart$;
  cartTotal$: Observable<number>;

   // State for UPI Modal
  isUpiModalVisible = false;
  upiQrCodeData: string | null = null;
  paymentStatusMessage: string | null = null;

  constructor() {
    this.cartTotal$ = this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
    );

    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }



  initiateUpiPayment(): void {
  if (this.checkoutForm.invalid) {
    this.checkoutForm.markAllAsTouched();
    alert('Please fill out all required fields before continuing.');
    return;
  }

  console.log('UPI payment initiated');

  this.isUpiModalVisible = true;
  this.paymentStatusMessage = 'Generating QR Code...';
  this.upiQrCodeData = null;

  this.cartTotal$.pipe(take(1)).subscribe(total => {
    if (total > 0) {
      const upiString = `upi://pay?pa=ishivamsoni150299@oksbi&pn=Swami%20Prasad%20Jewellers&am=${total}&cu=INR&tn=Order%20from%20Swami%20Prasad%20Jewellers`;
      this.upiQrCodeData = upiString;
      this.paymentStatusMessage = 'Scan the QR code with your UPI app to pay.';
    } else {
      this.paymentStatusMessage = 'Your cart is empty. Cannot generate QR Code.';
    }
  });
}


  closeUpiModal(): void {
    this.isUpiModalVisible = false;
    this.upiQrCodeData = null;
    this.paymentStatusMessage = null;
  }
}
