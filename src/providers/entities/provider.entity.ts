import { Product } from "src/products/entities/product.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;
    @Column('text')
    providerName: string;
    @Column('text')
    providerEmail: string;
    @Column({
        type: "text",
        nullable: true,
    })
    providerPhoneNumber: string;
    @OneToMany(() => Product, (photos) => photos.provider)
    products: Product[]
}
