import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  totalBookings = 128;
  totalRevenue = 586000;
  activeCars = 42;
  totalUsers = 310;

  recentBookings = [
    { customerName: 'Rahul Sharma', city: 'Pune', amount: 2400 },
    { customerName: 'Priya Mehta', city: 'Mumbai', amount: 1900 },
    { customerName: 'Vikram Singh', city: 'Delhi', amount: 2600 },
    { customerName: 'Aisha Khan', city: 'Bangalore', amount: 2100 },
    { customerName: 'Rohan Verma', city: 'Jaipur', amount: 1800 },
    { customerName: 'Sneha Patil', city: 'Nagpur', amount: 2200 }
  ];

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts() {
    // Booking Trends
    
    new Chart('bookingChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Bookings',
          data: [15, 28, 35, 45, 60, 70],
          borderColor: '#2193b0',
          backgroundColor: 'rgba(33,147,176,0.15)',
          fill: true,
          tension: 0.4
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });

    // City Wise Booking Bar
    new Chart('cityChart', {
      type: 'bar',
      data: {
        labels: ['Pune', 'Mumbai', 'Delhi', 'Chennai', 'Bangalore'],
        datasets: [{
          label: 'Bookings',
          data: [25, 42, 33, 28, 38],
          backgroundColor: ['#2193b0', '#00b09b', '#f7971e', '#ff416c', '#96c93d']
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });

    // Revenue Overview Doughnut

    new Chart('revenueChart', {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending', 'Cancelled'],
        datasets: [{
          data: [500000, 60000, 26000],
          backgroundColor: ['#00b09b', '#ffd200', '#ff4b2b']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
}
