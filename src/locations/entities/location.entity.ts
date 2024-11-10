import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity ()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;
    @Column('text')
    locationName: string;
    @Column('text')
    locationAdress: string;
    @Column('simple-array')
    locationLatLng: number[];

    //Relacion con Manager 
    @OneToOne(() => Manager)
    @JoinColumn({
        name: "managerId"
    })
    manager: Manager

    //Relacion con Region
    @ManyToOne(()=> Region, (region) => region.location)
    @JoinColumn({
        name: "regionId"
    })
    region: Region

    //Relacion con Employee
    @OneToMany(() => Employee, (employee) => employee.location)
    employee: Employee[];
    
}
