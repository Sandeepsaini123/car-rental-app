import { Component, inject, OnInit } from '@angular/core';
import { APIResponse, CarModel } from '../../model/car';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehicles',
  imports: [FormsModule],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css',
})
export class Vehicles implements OnInit {

  newCarObj: CarModel;
  http = inject(HttpClient);
  carList: CarModel[] = [];


  constructor() {
    this.newCarObj = new CarModel();
  }

  ngOnInit(): void {
    this.getAllcars();
  }
  getAllcars() {
    this.http.get<APIResponse>("https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCars").subscribe((res: APIResponse) => {
      this.carList = res.data;
    })
  }


  onSaveCar() {
    debugger;
    this.http.post<APIResponse>("https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewCar", this.newCarObj).subscribe((res: APIResponse) => {
      debugger;
      if (res.result) {
        alert("Vehicle Added Successfully")
        this.getAllcars();
      } else {
        alert(res.message)
      }
    })
  }

  onUpdateCar() {
    this.http.put<APIResponse>(
      "https://freeapi.miniprojectideas.com/api/CarRentalApp/UpdateCar",
      this.newCarObj
    ).subscribe((res: APIResponse) => {
      if (res.result) {
        alert("Vehicle Updated Successfully");
        this.getAllcars();
        this.newCarObj = new CarModel();
      } else {
        alert(res.message);
      }
    });
  }


  onDeleteCarById(id: number) {
    debugger;
    this.http.delete<APIResponse>("https://freeapi.miniprojectideas.com/api/CarRentalApp/DeleteCarbyCarId?carid=" + id).subscribe((res: APIResponse) => {
      debugger;
      if (res.result) {
        alert("Vehicle Deleted Successfully")
        this.getAllcars();
      } else {
        alert(res.message)
      }
    })
  }



  onEdit(data: CarModel) {
    this.newCarObj = data;
  }
}
