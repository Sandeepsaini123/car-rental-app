import { Component, inject, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {

  bookingSrv = inject(BookingService);

  carList: any[] = [];
  bookingList: any[] = [];
  bookingForm: FormGroup = new FormGroup({
    customerName: new FormControl(""),
    customerCity: new FormControl(""),
    moblileNo: new FormControl(""),
    email: new FormControl(""),
    bookingId: new FormControl(0),
    carId: new FormControl(null),
    bookingDate: new FormControl(""),
    discount: new FormControl(""),
    totalBillAmount: new FormControl(""),
  })

  ngOnInit(): void {
    this.getCarList();
    this.getBookings();
  }

  getCarList() {
    this.bookingSrv.getAllCars().subscribe((res: any) => {
      this.carList = res.data;
    })
  }

  getBookings() {
    this.bookingSrv.getAllBooking().subscribe((res: any) => {
      this.bookingList = res.data;
    })
  }

  onSave() {
    debugger;
    const formvalue = this.bookingForm.value;
    this.bookingSrv.saveBooking(formvalue).subscribe((res: any) => {
      if (res.result) {
        alert("Booking Done Successfully");
        this.getBookings();
      }
      else {
        alert(res.message)
      }
    })
  }
}
