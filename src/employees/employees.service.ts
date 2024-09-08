import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { last } from 'rxjs';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  private  employees: CreateEmployeeDto[] = [
    {
      id: 1,
      name: "Nelly",
      lastname: "Cadenas",
      phoneNumber: "4423181757"
    },
    {
      id: 2,
      name: "Nath",
      lastname: "Santos",
      phoneNumber: "4423889568"
    }
  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1;
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    //Todos los empleados
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee) => employee.id === id)[0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeUp = this.findOne(id);
    employeeUp = {
      ... employeeUp,
      ... updateEmployeeDto
    }
    this.employees = this.employees.map((employee) => {
      if (employee.id === id) {
        employee = employeeUp
      }
      return employee
    })
    return employeeUp;
  }

  remove(id: number) {
    this.employees =  this.employees.filter((employee) => employee.id !== id);
    return this.employees; 
  }
}
