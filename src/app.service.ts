import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getFoo(){
    console.log('NOT CACHED!');
    return {foo:'bar'};
  }
}
