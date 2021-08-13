import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

export interface ToDoInterface {
  id: number;
  description: string;
  isDone: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private dbInstance: SQLiteObject;

  constructor(private sqlite: SQLite) { }
  
  async getAllToDos() {
    let todos: ToDoInterface[] = [];
    return this.sqlite.create({ name: 'data.db', location: 'default' }).then(
      (db) => {
        this.dbInstance = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS '
          + 'TODO(id INTEGER PRIMARY KEY AUTOINCREMENT,'
          + ' description VARCHAR(50), isDone INTEGER(1))', [])
          .catch(e => console.log(e));
        todos = this.getAllRecords();
      }
    ).catch().then((e) => {
      console.log(e);
      return todos;
    });
  }

  private getAllRecords(): ToDoInterface[] {
    let todos: ToDoInterface[] = [];
    this.dbInstance.executeSql('select * from TODO', []).then(
      (res) => {
        for(var x=0; x<res.rows.length; x++)
          todos.push(res.rows.item(x));
      }
    ).catch(e => {
      console.log(e);
    });
    return todos;
  }
  
  async addToDo(description: string) {
    this.dbInstance.executeSql('insert into TODO(description, isDone) VALUES(?, ?)', [description, 0])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }
  
  async updateToDo(id: number) {
    this.dbInstance.executeSql('UPDATE TODO SET ISDONE=1 WHERE ID=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }
  
  async deleteToDo(id: number) {
    this.dbInstance.executeSql('DELETE FROM TODO WHERE ID=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

}
