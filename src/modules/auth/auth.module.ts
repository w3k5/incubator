import { Module } from '@nestjs/common';
import { AuthController } from '@app/modules/auth/auth.controller';

@Module({
	controllers: [AuthController],
})
export class AuthModule {}
