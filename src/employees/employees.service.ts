import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { last } from 'rxjs';
import { Employee } from './entities/employee.entity';
import { v4 as uuid } from "uuid";

@Injectable()
export class EmployeesService {
  private  employees: CreateEmployeeDto[] = [
    {
      id: uuid(),
      name: "Nelly",
      lastname: "Cadenas",
      phoneNumber: "4423181757"
    },
    {
      id: uuid(),
      name: "Nath",
      lastname: "Santos",
      phoneNumber: "4423889568"
    }
  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    //Todos los empleados
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee) => employee.id === id)[0];
    if(employee) throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeUp = this.findOne(id);
    employeeUp = {
      ... employeeUp,
      ... updateEmployeeDto
    }
    if(employeeUp) throw new NotFoundException();
    this.employees = this.employees.map((employee) => {
      if (employee.id === id) {
        employee = employeeUp
      }
      return employee
    })
    return employeeUp;
  }

  remove(id: string) {
    this.findOne(id);
    this.employees =  this.employees.filter((employee) => employee.id !== id);
    return this.employees; 
  }
}
