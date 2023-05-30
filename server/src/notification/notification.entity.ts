import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "../user/user.entity";

@Entity()
export default class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  senderId: string;

  @Column()
  receiverId: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  type: string;

  @Column()
  content: string;

  @Column({ default: false })
  hasBeenSeen?: boolean;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}
