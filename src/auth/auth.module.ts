import { AuthService } from './auth.service';
import { PrismaModule } from './../prisma/prisma.module';
import { UserModule } from './../user/user.module';
import { AuthController } from './auth.controller';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({
        secret: `k2zaPk*Gvix99rKG2yQ9p9N#m@80^N57`
    }),
    forwardRef(() => UserModule),
    PrismaModule
],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}