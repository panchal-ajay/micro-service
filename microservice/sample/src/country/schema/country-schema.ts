import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('country')
export class CountryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  postal_code: string;

  @Column({ nullable: false })
  country_code: string;

  @Column({ nullable: false })
  population: number;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
