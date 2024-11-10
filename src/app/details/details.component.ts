import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { UserInformation } from '../user-information';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="information">
      <p class="id">{{ userInformation?.id }}</p>
      <p class="name">{{ userInformation?.name }}</p>
      <p class="age">{{ userInformation?.age }}</p>
    </section>
    <section class="enter-parent">
      <p>Enter parent details below</p>
      <form [formGroup]="applyForm" (submit)=submitApplication()>
        <label for="parent-name">Parent Name</label>
        <input id="parent-name" type="text" formControlName="parentName">

        <label for="parent-email">Parent Email</label>
        <input id="parent-email" type="text" formControlName="parentEmail">

        <button type="submit" class="primary">Enter</button>
      <\section>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  userInformation: UserInformation | undefined;
  applyForm = new FormGroup({
    parentName: new FormControl(''),
    parentEmail: new FormControl('')
  })

  constructor() {
    const userInformationId = Number(this.route.snapshot.params['id'])
    this.userService.getUserInformationById(userInformationId).then(userInformation => {
      this.userInformation = userInformation;
    });
  }

  submitApplication() {
    this.userService.submitApplication(
      this.applyForm.value.parentName ?? '',
      this.applyForm.value.parentEmail ?? ''
    );
  }
}
