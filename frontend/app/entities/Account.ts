import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Account {
      //Account Information
        @PrimaryColumn("uuid")
        accountId!: string;

        @Index()
        @Column()
        userId!: string;
    
        @Column({ type: "enum", enum: ["savings", "checking"], default: "checking"})
        accountType!: string;
    
        @Column("decimal", { precision: 10, scale: 2, default: 0.00 })
        balance!: number;

        //Metadata
        @CreateDateColumn()
        createdAt!: Date;

        @UpdateDateColumn()
        updatedAt!: Date;

        //Relationships
        @ManyToOne(() => User, user => user.accounts)
        user!: User;
    
}