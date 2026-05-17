import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <-- Asegúrate de que esté aquí
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  title = 'app-front-consultorio';
}
