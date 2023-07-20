import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit{

  private usersService = inject(UsersServiceService);

  // Vereficamos que un id de usuario nunca va a ser 0
  public userId = signal(1);

  // Queremos saber qué usuario corresponde con el userId
  public currentUser = signal<User|undefined>(undefined);
  public userWasFound = signal(true);
  public fullName = computed<string>(() => {
    if(!this.currentUser()) return 'Usuario no encontrado';

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`

  })

  ngOnInit(): void {
    this.loadUser(this.userId())
  }

  loadUser(id: number) {
    // si el id es menor o igual a 0, no devuelve nada.
    if (id <= 0 ) return;

    this.userId.set(id);
    this.currentUser.set(undefined);

    this.usersService.getUserById(id)
      .subscribe({
        next: (user) => {
          this.currentUser.set(user);
          this.userWasFound.set(true);
        },
        error: () => {
          this.userWasFound.set(false);
          this.currentUser.set(undefined);
        }
      })
  }



}
