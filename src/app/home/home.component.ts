import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { BehaviorSubject } from 'rxjs';
import { Form } from '../models/form.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  forms:Array<Form>

  constructor(private service: AppService) {
    this.forms = service.forms
  }

}
