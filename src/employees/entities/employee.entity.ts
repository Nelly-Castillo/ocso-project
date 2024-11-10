import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string;
    @Column('text')
    name: string;
    @Column('text')
    lastname: string;
    @Column('text')
    phoneNumber: string;
    @Column('text')
    email: string;
    @Column({
        type: 'text',
        nullable: true
    })
    photoUrl: string;

    //Relacion con Location
    @ManyToOne(()=> Location, (location) => location.employee)
    @JoinColumn({
        name: "locationId"
    })
    location: Location;
}
