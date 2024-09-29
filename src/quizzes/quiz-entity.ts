import { Question } from 'src/questions/question-entity';
import { Response } from 'src/responses/response-entity';
import { Score } from 'src/score/score-entity';
import { User } from 'src/user/user-entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'quizzes' })
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'created_by', type: 'uuid' })
  created_by: string;

  @Column({ name: 'updated_by', type: 'uuid' })
  updated_by: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.createQuiz)
  @JoinColumn({ name: 'created_by' })
  created_By: User;

  @ManyToOne(() => User, (user) => user.updatedQuiz)
  @JoinColumn({ name: 'updated_by' })
  updated_By: User;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @OneToMany(() => Response, (response) => response.quiz)
  responses: Response[];

  @OneToMany(() => Score, (score) => score.quizID)
  score: Score[];
}
