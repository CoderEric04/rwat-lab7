import { Injectable } from '@angular/core';
import { UserInformation } from './user-information';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/users';

  constructor() { }

  async getAllUserInformation(): Promise<UserInformation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getUserInformationById(id: number): Promise<UserInformation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }  

  submitApplication(parentName: string, parentEmail: string) {
    console.log(parentName, parentEmail);
  }
}
