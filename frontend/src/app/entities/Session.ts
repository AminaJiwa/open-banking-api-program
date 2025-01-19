import { time } from "console";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DateUtils } from "typeorm/util/DateUtils.js";
import { User } from "./User";

@Entity()
export class Session{
    //Session information
    @PrimaryGeneratedColumn("uuid")
    sessionId!: string;

    @Index()
    @Column()
    userId!: string;

    @Index()
    @Column({ unique: true })
    sessionToken!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP + INTERVAL '1 day'" })
    expires!: Date;

    //Metadata
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    //Relationships
    @ManyToOne(() => User, user => user.sessions) 
    user!: User;   
    
}