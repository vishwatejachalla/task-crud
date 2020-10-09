import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid/dist';
import { CreateTaskDto } from 'src/dto/create-task.dto';
@Injectable()
export class TaskService {
  private task: Task[] = [];

  getallTasks() {
    return this.task;
  }

  getTaskById(id:string):Task{
      return this.task.find(task=>task.id===id)
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.DONE,
    };
    this.task.push(task);
    // console.log(task.id,uuid);
    return task;
  }

  deleteTask(id:string){
      this.task =this.task.filter(task=>task.id!==id)
  }

  updateTask(id:string,status:TaskStatus):Task{
      const task=this.getTaskById(id);
      task.status=status;
      return task;
  }
}
