import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('patches')
export class Patch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  version: string; // E.g., "1.0.4"

  @Column()
  releaseNotes: string; // What changed in this patch

  @Column()
  fileUrl: string; // URL to download the patch zip or docker image tag

  @Column()
  checksum: string; // SHA256 hash to verify patch integrity on client side

  @Column({ default: false })
  isCritical: boolean; // If true, client nodes might force auto-update

  @CreateDateColumn()
  releasedAt: Date;
}
