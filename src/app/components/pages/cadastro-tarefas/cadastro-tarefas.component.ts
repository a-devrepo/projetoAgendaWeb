import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-cadastro-tarefas',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.css'
})
export class CadastroTarefasComponent {
  
  categorias: any[] = [];
  mensagem: string = '';

  http = inject(HttpClient);
  formBuilder = inject(FormBuilder);
  
  form = this.formBuilder.group({
    titulo: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(100)]),
    data: new FormControl('',[Validators.required]),
    hora: new FormControl('',[Validators.required]),
    finalizado: new FormControl('',[Validators.required]),
    categoriaID: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
    this.http.get(environment.apiTarefas + '/categorias')
    .subscribe((response) =>{
      this.categorias = response as any[];
    });
  }

  onSubmit(){
    this.http.post(environment.apiTarefas + '/tarefas',this.form.value)
    .subscribe((response) =>{
      this.mensagem = this.form.get('titulo')?.value + ' cadastrada com sucesso!';
      this.form.reset()
    });
  }
}
