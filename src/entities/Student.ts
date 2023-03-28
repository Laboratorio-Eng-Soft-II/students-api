import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class Student {

    @PrimaryColumn()
    nusp: string

    @Column()
    name: string

    @Column()
    engineering: string

    @Column()
    current_quarter: number

    @Column()
    usp_email: string

    @Column()
    phone: string

    @Column('text', { nullable: true, array: true })
    skills: string[]

    @Column()
    address: string

}
