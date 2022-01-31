import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  // 1. Kiolvasni az id paramétert az URL-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap( params => params['id'].toString() === '0' ? 
      new Observable<Event>(subscriber => subscriber.next(new Event())) : 
      this.eventService.get(params['id']) )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
  ) { }

  onUpdate(eventForm: NgForm, event: Event): void {
    if (eventForm.form.valid) (event.id ? 
      this.eventService.update(event): 
      this.eventService.create(event))
        .subscribe(
            event => this.router.navigate(['/']),
            console.error
          );
  }

  ngOnInit(): void {}


}
