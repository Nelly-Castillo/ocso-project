import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { last } from 'rxjs';
import { Employee } from './entities/employee.entity';
import { v4 as uuid } from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    // createEmployeeDto.id = uuid();
    // this.employees.push(createEmployeeDto);
    // return createEmployeeDto;
    const employee = await this.employeeRepository.save(createEmployeeDto)
    return employee;
  }

  findAll() {
    //Todos los empleados
    // return this.employees;
    return this.employeeRepository.find();
  }

  async findOne(id: string) {
    // const employee = this.employees.filter((employee) => employee.id === id)[0];
    // if(employee) throw new NotFoundException();
    // return employee;
    const employee = await this.employeeRepository.findOneBy({
      employeeId: id
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    // let employeeUp = this.findOne(id);
    // employeeUp = {
    //   ... employeeUp,
    //   ... updateEmployeeDto
    // }
    // if(employeeUp) throw new NotFoundException();
    // this.employees = this.employees.map((employee) => {
    //   if (employee.id === id) {
    //     employee = employeeUp
    //   }
    //   return employee
    // })
    // return employeeUp;
    const employeeUp = await  this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    this.employeeRepository.save(employeeUp)
    return employeeUp;
  }

  remove(id: string) {
    // this.findOne(id);
    // this.employees =  this.employees.filter((employee) => employee.id !== id);
    // return this.employees; 
    this.employeeRepository.delete({
      employeeId: id,
    })
    return {
      message: "Employee deleted"
    }
  }
}
