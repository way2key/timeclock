import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../admin-dashboard.service';
import * as moment from 'moment/moment';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  admin = {
    firstname: 'Nom',
    lastname: 'Prenom'
  }
  clockMachines = [];
  constructor(private adminDashboardService: AdminDashboardService) { }

  ngOnInit(): void {
    this.getTeacher();
    const socket = io.connect("http://localhost:4000/dashboard");
    socket.on('updateClockMachine', clockMachines => {
      this.clockMachines = clockMachines;
    })

    socket.on('newClockMachine', machine => {
      this.clockMachines.push(machine);
    })

    socket.on('clockMachineDisconnected', socketId => {
      this.clockMachines = this.clockMachines.filter(item => item.socketId !== socketId);
    })
  }

  getTeacher(): void {
  this.adminDashboardService.getAdmin().subscribe(
    admin => this.admin = admin
  )
}

}
