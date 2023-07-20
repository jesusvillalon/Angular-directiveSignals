import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnDestroy, OnInit{


  public counter = signal(10);

  public user = signal<User>({
        id: 1,
        email: "george.bluth@reqres.in",
        first_name: "George",
        last_name: "Bluth",
        avatar: "https://reqres.in/img/faces/1-image.jpg"
  })

  public fullName = computed(() =>
   `${this.user()?.first_name} ${this.user()?.last_name}`)

  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter()}`)
  })

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

  // Aquí mostramos la limpieza del efecto, no del intervalo.
  ngOnInit(): void {
    setInterval(() => {
      this.counter.update(current => current + 1)
    }, (1000))
  }

  increaseBy(value: number){
    this.counter.update(current => current + value);
  }

  onFieldUpdated(field: keyof User, value: string){

  // Establece el nuevo valor sin tener en cuenta el anterior
    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // })


  // El valor que se retorna en el callback es el nuevo valor de la señal
    this.user.update(current => {
      return {
        ...current,
        [field]: value
      }
    })

  // Cuando hacemos una modificación al objeto que tenemos, automáticamente
  // dispara la actualización.
    // this.user.mutate(current => {
    //   switch(field) {
    //     case 'email':
    //       current.email = value;
    //       break;

    //     case 'first_name':
    //       current.first_name = value;
    //       break;

    //     case 'last_name':
    //       current.last_name = value;
    //       break;

    //     case 'id':
    //       current.id = Number(value);
    //       break;
    //   }
    // })

  }

}
