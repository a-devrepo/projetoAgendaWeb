import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edicao-tarefas',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './edicao-tarefas.component.html',
  styleUrl: './edicao-tarefas.component.css'
})
export class EdicaoTarefasComponent {

  id: string = '';

  categorias: any[] = [];

  tarefa: any;

  http = inject(HttpClient);

  activated = inject(ActivatedRoute);

  formBuilder = inject(FormBuilder);

  mensagem: string = '';

  ngOnInit(){
    this.id = this.activated.snapshot.params['id'];
    this.http.get(`${environment.apiTarefas}/tarefas/${this.id}`)
    .subscribe((response:any) => {
      this.form.patchValue({
        titulo: response.titulo,
        data: response.data,
        hora: response.hora,
        finalizado: response.finalizado,
        categoriaID: response.categoria.id
      })
    });

    this.http.get(`${environment.apiTarefas}/categorias`)
    .subscribe((response:any)=>{
      this.categorias = response as any[];
    })
  }

  form = this.formBuilder.group({
    titulo:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(100)]),
    data: new FormControl('',[Validators.required]),
    hora: new FormControl('',[Validators.required]),
    finalizado: new FormControl('',[Validators.required]),
    categoriaID: new FormControl('',[Validators.required])
  })

  onSubmit(){
    this.http.put(`${environment.apiTarefas}/tarefas/${this.id}`,this.form.value)
    .subscribe((response: any) =>{
      this.mensagem = `Tarefa ${response.titulo} atualizada com sucesso`;
    })
  }
}
