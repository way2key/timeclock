import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../admin-auth.service';
import { AdminDashboardService } from '../admin-dashboard.service';


@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {
  admin = {
    firstname: "Nom",
    lastname: "Prénom",
  };
  constructor(private adminAuthService: AdminAuthService, private adminDashboardService: AdminDashboardService) { }

  ngOnInit(): void {
    this.getAdmin();
  }

  logAdminOut(): void {
    this.adminAuthService.logUserOut();
  }

  getAdmin(): void {
    this.adminDashboardService.getAdmin().subscribe(
      admin => this.admin = admin
    )
  }

}
