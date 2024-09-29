import { Option } from 'src/options/option-entity';
import { Question } from 'src/questions/question-entity';
import { Quiz } from 'src/quizzes/quiz-entity';
import { Response } from 'src/responses/response-entity';
import { Score } from 'src/score/score-entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'role', type: 'enum', enum: ['student', 'admin'] })
  role: 'student' | 'admin';

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;

  @Column({ name: 'created_by', type: 'uuid' })
  created_by: string;

  @Column({ name: 'updated_by', type: 'uuid' })
  updated_by: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  created_By: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by', referencedColumnName: 'id' })
  updated_By: User;

  @OneToMany(() => Quiz, (quiz) => quiz.created_By)
  createQuiz: Quiz[];

  @OneToMany(() => Quiz, (quiz) => quiz.updated_By)
  updatedQuiz: Quiz[];

  @OneToMany(() => Question, (question) => question.create_By)
  createQuestion: Question[];

  @OneToMany(() => Question, (question) => question.create_By)
  updateQuestion: Question[];

  @OneToMany(() => Option, (option) => option.create_By)
  createOption: Option[];

  @OneToMany(() => Option, (option) => option.create_By)
  updateOption: Option[];

  @OneToMany(() => Response, (response) => response.create_By)
  createResponse: Response[];

  @OneToMany(() => Response, (response) => response.create_By)
  updateResponse: Response[];

  @OneToMany(() => Response, (response) => response.user)
  responses: Response[];

  @OneToMany(() => Score, (score) => score.create_By)
  createScore: Score[];

  @OneToMany(() => Score, (score) => score.update_By)
  updateScore: Score[];

  @OneToMany(() => Score, (score) => score.userID)
  scores: Score[];
}
