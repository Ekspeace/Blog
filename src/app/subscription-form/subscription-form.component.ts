import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from '../models/subscription';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit{


  isEmail: boolean = false;

  constructor(private subService: SubscribersService){}


  ngOnInit(): void {
  }


  onSubmit(formValue: any){

    const subData: Subscription = {
      name: formValue.name,
      email: formValue.email
    }
    this.subService.checkSubs(subData.email).subscribe(val => {
      if(val.empty){
        this.subService.addSubs(subData);
      }
      else{
        this.isEmail = true;
      }
    })
    formValue.reset;
  }
}
