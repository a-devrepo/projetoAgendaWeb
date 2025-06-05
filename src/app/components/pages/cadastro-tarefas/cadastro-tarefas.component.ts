import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
  formBuilder = inject(FormBuilder);
  
  form = this.formBuilder.group({
    titulo: new FormControl('',[Validators.required]),
    data: new FormControl('',[Validators.required]),
    hora: new FormControl('',[Validators.required]),
    fnalizado: new FormControl('',[Validators.required]),
    categoriaId: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
    this.http.get('http://localhost:8081/api/v1/categorias')
    .subscribe((response) =>{
      this.categorias = response as any[];
    });
  }
}
