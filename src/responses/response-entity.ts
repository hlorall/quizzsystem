import { Option } from 'src/options/option-entity';
import { Question } from 'src/questions/question-entity';
import { Quiz } from 'src/quizzes/quiz-entity';
import { User } from 'src/user/user-entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity({ name: 'responses' })
export class Response {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id', type: 'varchar' })
    user_id: string;

    @ManyToOne(() => User, (user) => user.responses)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'quiz_id', type: 'varchar' })
    quiz_id: string;
    
    @ManyToOne(() => Quiz, (quiz) => quiz.responses)
    @JoinColumn({ name: 'quiz_id' })
    quiz: Quiz;

    @Column({ name: 'question_id', type: 'varchar' })
    question_id: string;

    @ManyToOne(() => Question, (question) => question.responses)
    @JoinColumn({ name: 'question_id' })
    question: Question;

    @Column({ name: 'selected_option_id', type: 'varchar' })
    selected_option_id: string;
    
    @ManyToOne(() => Option, (option) => option.responses)
    @JoinColumn({ name: 'selected_option_id' })
    option: Option;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @Column({ name: 'created_by', type: 'uuid' })
    created_by: string;

    @ManyToOne(() => User, (user) => user.createResponse)
    @JoinColumn({ name: 'created_by' })
    create_By: User;

    @Column({ name: 'updated_by', type: 'uuid' })
    updated_by: string;

    @ManyToOne(() => User, (user) => user.updateResponse)
    @JoinColumn({ name: 'updated_by' })
    update_By: User;


}