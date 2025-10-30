import { Component, OnInit, inject } from '@angular/core';
import { BookingService } from '../../services/booking-service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {
  bookingSrv = inject(BookingService);
  fb = inject(FormBuilder);

  carList: any[] = [];
  bookingList: any[] = [];

  bookingForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getCarList();
    this.getBookings();
  }

  initForm() {
    this.bookingForm = this.fb.group({
      bookingId: [0],
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      customerCity: ['', Validators.required],
      mobileNo: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      carId: [null, Validators.required],
      bookingDate: ['', Validators.required],
      discount: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      totalBillAmount: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get f() {
    return this.bookingForm.controls;
  }

  getCarList() {
    this.bookingSrv.getAllCars().subscribe((res: any) => {
      this.carList = res.data;
    });
  }

  getBookings() {
    this.bookingSrv.getAllBooking().subscribe((res: any) => {
      this.bookingList = res.data;
    });
  }

  onSave() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const formValue = this.bookingForm.value;
    this.bookingSrv.saveBooking(formValue).subscribe((res: any) => {
      if (res.result) {
        alert('Booking Done Successfully');
        this.getBookings();
        this.bookingForm.reset({ bookingId: 0 });
      } else {
        alert(res.message);
      }
    });
  }
}
