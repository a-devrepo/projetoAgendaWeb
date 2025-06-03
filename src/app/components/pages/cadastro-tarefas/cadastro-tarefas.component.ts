import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-cadastro-tarefas',
  imports: [
    CommonModule
  ],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.css'
})
export class CadastroTarefasComponent {
  
  categorias: any[] = [];

  http = inject(HttpClient);
  
  ngOnInit(): void {
    this.http.get('http://localhost:8081/api/v1/categorias')
    .subscribe((response) =>{
      this.categorias = response as any[];
    });
  }
}
