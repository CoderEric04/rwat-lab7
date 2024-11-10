import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInformation } from '../user-information';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <main>
      <section class="user">
          <p class="name">{{ userInformation.name }}</p>
          <p class="age">{{ userInformation.age }}</p>
          <a [routerLink]="['/details', userInformation.id]">Learn More</a>
      </section>
    </main>
  `,
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() userInformation!:UserInformation;
}
