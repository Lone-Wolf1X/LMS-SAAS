import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('licenses')
export class License {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string; // The actual license key generated (e.g. NGI-XXXX-YYYY-ZZZZ)

  @Column()
  tenantName: string; // E.g., "ABC High School"

  @Column()
  tenantDomain: string; // E.g., "abchighschool.lms.com"

  @Column({ type: 'timestamp' })
  expiryDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  features: object; // To control which modules are active for this tenant

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
