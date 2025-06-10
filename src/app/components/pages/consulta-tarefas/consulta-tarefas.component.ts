import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-consulta-tarefas',
  imports: [CommonModule],
  templateUrl: './consulta-tarefas.component.html',
  styleUrl: './consulta-tarefas.component.css'
})
export class ConsultaTarefasComponent {
  
  tarefas: any[] = [];

  http = inject(HttpClient);

  ngOnInit(){
    this.http.get(environment.apiTarefas + '/tarefas')
    .subscribe((response) =>{
      this.tarefas = response as any[];
    });
  }

  onDelete(tarefa:any){
    
    if(confirm(`Deseja realmente excluir a tarefa: ${tarefa.titulo}?`)){
      this.http.delete(`${environment.apiTarefas}/tarefas/${tarefa.id}`)
      .subscribe((response:any) => {
        alert(`Tarefa ${tarefa.titulo} excluída com sucesso!`);
        this.ngOnInit();
      });
    }
  }
}
