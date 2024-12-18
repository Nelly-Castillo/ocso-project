import { IsEmail, IsString, MaxLength } from "class-validator";
import { Employee } from '../entities/employee.entity';
export class CreateEmployeeDto {
    @IsString()
    @MaxLength(30)
    name: string;
    @IsString()
    @MaxLength(70)
    lastname: string;
    @IsString()
    @MaxLength(10)
    phoneNumber: string;

    @IsString()
    @IsEmail()
    email:string;
}
