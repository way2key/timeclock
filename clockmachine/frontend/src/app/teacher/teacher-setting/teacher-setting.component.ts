import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TeacherSettingService } from '../teacher-setting.service';
import { Router } from '@angular/router';
import { Howl, Howler } from 'howler';
import { AppRuntimeConfigurationService } from '../../app-runtime-config.service';


@Component({
  selector: 'app-teacher-setting',
  templateUrl: './teacher-setting.component.html',
  styleUrls: ['./teacher-setting.component.scss']
})
export class TeacherSettingComponent implements OnInit {
  updatePasswordForm = new FormGroup({
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  defaultWeek;
  selectedWeek:string;
  sounds;
  soundSetting;
  soundToPlay;
  clockMachine;
  loading;
  clockInSound;
  clockOffSound;
  infoSound;
  errorSound;

  constructor(private teacherSettingService: TeacherSettingService, private router: Router, private formBuilder: FormBuilder, private runtimeConfiguration: AppRuntimeConfigurationService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getClockMachine(this.runtimeConfiguration.getConfig().clockMachineId);
    this.getDefaultWeek();
    this.getSound();
  }

  getDefaultWeek(): void {
    this.teacherSettingService.getDefaultWeek()
    .subscribe(
      defaultWeeks => {
        this.defaultWeek = [];
        for (let week of defaultWeeks) {
          this.defaultWeek.push({name:week.name,id:week._id})
        }
      },
      error => console.log(error)
    )
  }

  getSound(): void {
    this.teacherSettingService.getSound()
    .subscribe(
      sounds => this.sounds = sounds
    )
  }

  updatePassword(): void {
    let p1 = this.updatePasswordForm.value.newPassword;
    let p2 = this.updatePasswordForm.value.confirmPassword;
    let payload = {password: p1};
    if(p1===p2){
      this.teacherSettingService.updatePassword(payload)
      .subscribe(
        ((data) => {
          console.log('success: ', data);
        }),
        ((error) => {
        console.log('error: ', error);
        })
      );
    }
  }

  getClockMachine(clockMachineId): void {
    this.teacherSettingService.getClockMachine(clockMachineId)
    .subscribe(
      machine => {
        this.clockMachine = machine;

        if(machine.defaultWeek) {
          this.selectedWeek = machine.defaultWeek;
        }

        if(machine.sound) {
          this.soundSetting = machine.sound;
        }
        this.loading = false;
      }
    )
  }

  updateClockMachineNotification(): void {
    this.teacherSettingService.updateClockMachineNotification(this.clockMachine)
    .subscribe(
      succes => console.log(succes),
      error => console.log(error)
    )
  }

  updateClockMachineVolume(): void {
    this.teacherSettingService.updateClockMachineVolume(this.clockMachine)
    .subscribe(
      succes => console.log(succes),
      error => console.log(error)
    )
  }

  updateDefaultWeek(): void {
    let payload = {
      defaultWeek: this.selectedWeek,
      id:this.runtimeConfiguration.getConfig().clockMachineId
    }

    this.teacherSettingService.updateClockMachineDefaultWeek(payload)
    .subscribe(
      succes => console.log(succes),
      error => console.log(error)
    )
  }

  updateSound(): void {
    let payload = {
      clockMachineId:this.runtimeConfiguration.getConfig().clockMachineId,
      sound: {
        clockIn:this.clockMachine.sound.clockIn,
        clockOff:this.clockMachine.sound.clockOff,
        info:this.clockMachine.sound.info,
        error:this.clockMachine.sound.error,
      }
    }
    this.teacherSettingService.updateClockMachineSound(payload)
    .subscribe(
      succes => console.log(succes),
      error => console.log(error)
    )
  }

  deleteLog(): void {
    this.teacherSettingService.deleteLog().subscribe();
  }

  deleteIncident(): void {
    this.teacherSettingService.deleteIncident().subscribe();
  }

  playSound(): void {
    let path = "../../../assets/sound/"+this.soundToPlay;
    const sound = new Howl({
      src:[path]
    });
    sound.play();
  }
}
