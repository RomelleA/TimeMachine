import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Time } from '@angular/common';
import { Subscription } from 'rxjs';

import { Hour } from '../hour.model';
import { HoursService } from '../hours.service';

@Component({
  selector: 'app-hour-edit',
  templateUrl: './hour-edit.component.html',
  styleUrls: ['./hour-edit.component.css'],
})

export class HourEditComponent {
  view = {
    userInDate: null,
    userInTime: null,
    userOutTime: null,
    isDone: false,
    isLoading: false,
    mode:'create',
  };

  isDone = false;
  isLoading = false;
  hour: Hour;
  private timeId: string;

  constructor(
    public hoursService: HoursService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('timeId')) {
        this.view.mode = 'edit';
        this.timeId = paramMap.get('timeId');
        this.isLoading = true;
        this.hoursService.getHour(this.timeId).subscribe((hourData) => {
          this.isLoading = false;
          this.hour = {
            id: hourData._id,
            date: hourData.date,
            startTime: hourData.startTime,
            endTime: hourData.endTime,
          };
          this.timeId = hourData._id;
          this.view.userInDate = new Date(hourData.date);
          this.view.userInTime = new Date(hourData.startTime)
            .toString()
            .slice(16, -35);
          this.view.userOutTime = new Date(hourData.endTime)
            .toString()
            .slice(16, -35);
        });
      } else {
        this.view.mode = 'create';
        this.timeId = null;
      }
    });
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const newInTime = this.dateConvertor(
      this.view.userInDate,
      this.view.userInTime
    );
    const newOutTime = this.dateConvertor(
      this.view.userInDate,
      this.view.userOutTime
    );

    if (this.view.mode === 'create') {
      this.hoursService.addHour(newInTime, newInTime, newOutTime);
      this.isDone = true;
    } else {
      this.hoursService.updateHour(
        this.timeId,
        newInTime,
        newInTime,
        newOutTime
      );
      this.isDone = true;
    }
    form.reset();
  }

  dateConvertor(currentDate: Date, currentTime: Time): Date {
    var dateString = `${currentDate
      .toString()
      .slice(0, -40)}${currentTime}:00${currentDate.toString().slice(24, 0)}`;
    var newDate = new Date(dateString);
    return newDate;
  }


}
