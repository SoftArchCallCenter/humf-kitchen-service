import { Body, Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService
) {}

  @UseInterceptors(CacheInterceptor)
  async getFoo(@Body() n:number){
    const foo = await this.redisService.get('foo');
    if (foo){
      console.log("CACHED");
      return foo;
    }
    const f = this.appService.getFoo();
    this.redisService.set('foo', f)
    return f;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
