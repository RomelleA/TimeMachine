import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Hour } from '../hour.model';
import { HoursService } from '../hours.service';

@Component({
  selector: 'app-hour-list',
  templateUrl: './hour-list.component.html',
  styleUrls: ['./hour-list.component.css'],
})
export class HourListComponent implements OnInit, OnDestroy {
  today;
  hours: Hour[] = [];
  isLoading = false;
  private hoursSub: Subscription;

  constructor(public hoursService: HoursService) {}

  ngOnInit() {
    this.isLoading = true;
    this.hoursService.getAllHours();
    this.hoursSub = this.hoursService
      .getHourUpdateListener()
      .subscribe((hours: Hour[]) => {
        this.isLoading = false;
        this.hours = hours;
      });
      this.today = new Date().toLocaleDateString('he-IL', {month:'long'});
  }

  onDelete(hourID: string) {
    this.hoursService.deleteHour(hourID);
  }

  ngOnDestroy() {
    this.hoursSub.unsubscribe();
  }
}
