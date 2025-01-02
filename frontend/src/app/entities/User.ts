import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id!: string;

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

    //Authentication
    @Column()
    passwordHash!: string;

    //Authorisation
    @Column({ nullable: true })
    accessToken?: string;

    @Column({ nullable: true})
    refreshToken?: string;

    @Column({ type: "json", nullable: true })
    //List of permissions
    scope?: string[];

    //Account Information
    @Index()
    @Column()
    accountId!: string;

    @Column({ type: "enum", enum: ["savings", "checking"], default: "checking"})
    accountType!: string;

    @Column("decimal", { precision: 10, scale: 2, default: 0.00 })
    balance!: number;

    //Security
    @Column({ default: false })
    mfaEnabled!: boolean;

    @Column("json", { nullable: true })
    mfaMethods?: string[];

    //Profile Information
    @Column({ nullable: true })
    address?: string;

    @Column({ type: "date", nullable: true })
    dateOfBirth?: Date;

    //Metadata
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}