import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'

import { Hour } from './hour.model';

// const apiUrls = {
//   getHours: "/api/hours"
// };

@Injectable({ providedIn: 'root' })
export class HoursService {
  private hours: Hour[] = [];
  private hoursUpdated = new Subject<Hour[]>();


  constructor(private http: HttpClient, private router:Router) {}

  getAllHours() {
    this.http
      .get<{ message: string; hours: any }>(
        'http://localhost:3000/api/hours' // apiUrls.getHours
      )
      .pipe(map((hourData) => {
        return hourData.hours.map(hour => {
          return {
            id: hour._id,
            date: hour.date,
            startTime: hour.startTime,
            endTime: hour.endTime
          };
        });
      }))
      .subscribe((transformedHours) => {
        this.hours = transformedHours;
        this.hoursUpdated.next([...this.hours]);
      });
  }

  getHourUpdateListener() {
    return this.hoursUpdated.asObservable();
  }

  getHour(id: string) {
    return this.http.get<{ _id: string; date:Date; startTime: Date; endTime: Date }>(
      "http://localhost:3000/api/hours/" + id);

  }

  addHour(date:Date, startTime: Date, endTime: Date) {
    const hour: Hour = {
      id: null,
      date: date,
      startTime: startTime,
      endTime: endTime
    };
    this.http
      .post<{ message: string, hourID: string }>('http://localhost:3000/api/hours', hour)  // apiUrls.getHours
      .subscribe((responseDate) => {
        const hourID = responseDate.hourID;
        hour.id = hourID;
        this.hours.push(hour);
        this.hoursUpdated.next([...this.hours]);
        this.router.navigate(["/"]);
      });
  }

  updateHour(id: string, date: Date, startTime: Date, endTime: Date) {
    const hour: Hour = { id: id, date: date, startTime: startTime, endTime: endTime }
    this.http
    .patch("http://localhost:3000/api/hours/" + id, hour)
    .subscribe(response => {
      const updatedHours = [...this.hours];
      const oldHourIndex = updatedHours.findIndex(h => h.id === hour.id);
      updatedHours[oldHourIndex] = hour;
      this.hours = updatedHours;
      this.hoursUpdated.next([...this.hours]);
      this.router.navigate(["/"]);
    });
  }


  deleteHour(hourID: string) {
    this.http.delete("http://localhost:3000/api/hours/" + hourID)
    .subscribe(() => {
      const updatedHours = this.hours.filter(hour => hour.id !== hourID);
      this.hours = updatedHours;
      this.hoursUpdated.next([...this.hours]);
    });
  }
}
