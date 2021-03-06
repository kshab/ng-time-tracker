import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageOneComponent } from '../pages/page-one/page-one.component';
import { PageTwoComponent } from '../pages/page-two/page-two.component';
import { PageThreeComponent } from '../pages/page-three/page-three.component';
import { ReportComponent } from '../pages/report/report.component';
import { AuthComponent } from '../pages/auth/auth.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
    {
        path: '', redirectTo: 'page-one', pathMatch: 'full'
    },
    {
        path: 'auth', component: AuthComponent
    },
    {
        path: 'page-one', component: PageOneComponent, canActivate: [AuthGuard]
    },
    {
        path: 'page-two', component: PageTwoComponent, canActivate: [AuthGuard]
    },
    {
        path: 'page-three', component: PageThreeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'report', component: ReportComponent
    }
];



@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
