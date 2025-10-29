import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Vehicles } from './pages/vehicles/vehicles';
import { Booking } from './pages/booking/booking';
import { Signup } from './pages/signup/signup';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'signup',
        pathMatch:'full'
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'signup',
        component:Signup

    },
    {
        path:'',
        component:Layout,
        children:[
            {
                path:'dashboard',
                component:Dashboard
            },
            {
                path:'vehicles',
                component:Vehicles
            },
            {
                path:'booking',
                component:Booking
            }
        ]
    }
];
