import { Component, OnInit } from '@angular/core';
import { fromEvent, throttleTime, map, scan } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-101-day-3';

  ngOnInit(): void {
    fromEvent(document, 'click')
      .pipe(
        throttleTime(1000),
        map((event: any) => event.clientX),
        scan((count, clientX) => count + clientX, 0)
      )
      .subscribe((count) => console.log(count));
  }
}
