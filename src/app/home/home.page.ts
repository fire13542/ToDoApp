import { Component, OnInit } from '@angular/core';
import { DbService, ToDoInterface } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  todos: ToDoInterface[];

  todoInput: string;
  
  constructor(private dbService: DbService) { }
  
  ionViewDidEnter() {
    this.todoInput = "";
    this.dbService.getAllToDos().then(data => this.todos = data);
  }
  
  addToDo(description: string) {
    this.dbService.addToDo(description).then(data => {
      this.todos = data;
      this.todoInput = "";
    });
  }
  
  deleteToDo(id: number) {
    this.dbService.deleteToDo(id)
      .then(data => this.todos = data);
  }
  
  doneToDo(id: number) {
    this.dbService.updateToDo(id)
      .then(data => this.todos = data);
  }

}
