import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get('http://localhost:8081/api/v1/categorias')
    .subscribe((dados) =>{
      console.log(dados);
    })
}
}
