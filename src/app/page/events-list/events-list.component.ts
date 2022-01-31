import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  eventList$: Observable<Event[]> = this.eventService.getAll();

  constructor(
    private eventService: EventService,
    private router: Router,
  ) { }

  onCreateNew(): void {
    this.router.navigate(['/', 'event', '0']);
  }

  onDelete(event: Event): void {
    console.log(event);
    this.eventService.remove(event).subscribe(event => 
      this.eventList$ = this.eventService.getAll(),
      console.error
      );
  }
  
  ngOnInit(): void {}

}
