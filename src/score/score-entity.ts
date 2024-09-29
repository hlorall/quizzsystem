import { Quiz } from 'src/quizzes/quiz-entity';
import { User } from 'src/user/user-entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    } from 'typeorm';

@Entity({name : 'scores'})
export class Score {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name : 'quiz_id', type: 'varchar'})
    quiz_id: string;
    
    @ManyToOne(() => Quiz, (quiz) => quiz.score)
    @JoinColumn({name : 'quiz_id'})
    quizID: Quiz;

    @Column({name : 'user_id', type: 'varchar'})
    user_id: string;

    @ManyToOne(() => User, (user) => user.scores)
    @JoinColumn({name : 'user_id'})
    userID: User;


    @Column({name : 'score', type: 'int'})
    score: number;

    @CreateDateColumn({name : 'created_at', type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({name : 'updated_at', type: 'timestamp'})
    updated_at: Date;

    @Column({name : 'created_by', type: 'uuid'})
    created_by: string;

    @Column({name : 'updated_by', type: 'uuid'})
    updated_by: string;

    @ManyToOne(() => User, (user) => user.createScore)
    create_By: User;

    @ManyToOne(() => User, (user) => user.updateScore)
    update_By: User;


}