import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KitchenModule } from './kitchen/kitchen.module';

@Module({
  imports: [KitchenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
