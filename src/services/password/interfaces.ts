import { HashedPassword, UnhashedPassword } from '@app/common/types/primitives';

export abstract class AbstractPasswordService {
	abstract hashPassword: (password: UnhashedPassword) => Promise<HashedPassword>;
	abstract check: (unhashed: UnhashedPassword, hashed: HashedPassword) => Promise<boolean>;
}
