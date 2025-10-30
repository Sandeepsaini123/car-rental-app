import { Component, inject, OnInit } from '@angular/core';
import { APIResponse, CarModel } from '../../model/car';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css'
})
export class Vehicles implements OnInit {

  http = inject(HttpClient);
  fb = inject(FormBuilder);
  carList: CarModel[] = [];
  carForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
    this.getAllcars();
  }

  initializeForm() {
    this.carForm = this.fb.group({
      carId: [0],
      brand: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2099)]],
      color: ['', Validators.required],
      dailyRate: ['', [Validators.required, Validators.min(0)]],
      regNo: ['', [Validators.required,]],
      carImage: ['']
    });
  }

  getAllcars() {
    this.http.get<APIResponse>("https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCars")
      .subscribe((res: APIResponse) => {
        this.carList = res.data || [];
      });
  }

  onSubmit() {
    if (this.carForm.invalid) {
      this.carForm.markAllAsTouched();
      return;
    }

    const carObj = this.carForm.value as CarModel;

    if (carObj.carId === 0) {
      this.onSaveCar(carObj);
    } else {
      this.onUpdateCar(carObj);
    }
  }

  onSaveCar(car: CarModel) {
    this.http.post<APIResponse>("https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewCar", car)
      .subscribe((res: APIResponse) => {
        if (res.result) {
          alert("Vehicle Added Successfully");
          this.getAllcars();
          this.carForm.reset({ carId: 0 });
        } else {
          alert(res.message);
        }
      });
  }

  onUpdateCar(car: CarModel) {
    this.http.put<APIResponse>("https://freeapi.miniprojectideas.com/api/CarRentalApp/UpdateCar", car)
      .subscribe((res: APIResponse) => {
        if (res.result) {
          alert("Vehicle Updated Successfully");
          this.getAllcars();
          this.carForm.reset({ carId: 0 });
        } else {
          alert(res.message);
        }
      });
  }

  onDeleteCarById(id: number) {
    this.http.delete<APIResponse>("https://freeapi.miniprojectideas.com/api/CarRentalApp/DeleteCarbyCarId?carid=" + id)
      .subscribe((res: APIResponse) => {
        if (res.result) {
          alert("Vehicle Deleted Successfully");
          this.getAllcars();
        } else {
          alert(res.message);
        }
      });
  }

  onEdit(data: CarModel) {
    this.carForm.patchValue(data);
  }

  onClear() {
    this.carForm.reset({ carId: 0 });
  }

  // Utility getter for easy access in template
  get f() {
    return this.carForm.controls;
  }
}
