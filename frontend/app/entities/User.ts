import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Session } from "./Session";
import { Account } from "./Account";

@Entity()
export class User{
    //User information
    @PrimaryGeneratedColumn("uuid")
    userId!: string;

    @Column()
    firstName!: string;

    @Column({ nullable: true})
    middleName?: string;

    @Column()
    lastName!: string;

    @Index({ unique: true})
    @Column()
    email!: string;

    @Column({ nullable: true})
    @Index()
    phone?: string;

    @Column({ nullable: true })
    address?: string;
 
    @Column({ type: "date", nullable: true })
    dateOfBirth?: Date;

    //Authentication
    @Column()
    passwordHash!: string;

    //Authorisation
    @Column({ nullable: true })
    accessToken?: string;

    @Column({ nullable: true})
    refreshToken?: string;

    //List of permissions
    @Column({ type: "json", nullable: true })
    scope?: string[];

    //Security
    @Column({ default: false })
    mfaEnabled!: boolean;

    @Column("json", { nullable: true })
    mfaMethods?: string[];

    //Metadata
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    //Relationships
    @OneToMany(() => Session, session => session.user)
    sessions!: Session[];

    @OneToMany(() => Account, account => account.user)
    accounts!: Account[];
}