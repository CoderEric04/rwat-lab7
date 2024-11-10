import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserInformation } from '../user-information';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, UserDetailsComponent],
  template: `
    <main>
      <section>
        <form>
          <input type="text" placeholder="filter by name" #filter>
          <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
        </form>
      </section>
      <section>
        <app-user-details *ngFor="let userInformation of filteredUserList" 
                          [userInformation]="userInformation">
        </app-user-details>
      </section>
    </main>
  `,
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userInformationList: UserInformation[] = [];
  userService: UserService = inject(UserService);

  filteredUserList: UserInformation[] = [];

  constructor() {
    this.userService.getAllUserInformation().then((userInformationList: UserInformation[]) => {
      this.userInformationList = userInformationList;
      this.filteredUserList = userInformationList;
    });
  }

  filterResults(text: string) {
    if (!text) this.filteredUserList = this.filteredUserList;

    this.filteredUserList = this.filteredUserList.filter(
      userInformation => userInformation?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
