import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { HashedPassword, UnhashedPassword } from '@app/common/types/primitives';
import { AbstractPasswordService } from './interfaces';

@Injectable()
export class PasswordService implements AbstractPasswordService {
	async check(unhashed: UnhashedPassword, hashed: HashedPassword): Promise<boolean> {
		return bcrypt.compare(unhashed, hashed);
	}

	async hashPassword(password: UnhashedPassword): Promise<HashedPassword> {
		return await bcrypt.hash(password, 10);
	}
}
