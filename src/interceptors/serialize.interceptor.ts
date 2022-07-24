import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    /**
     *  run something before a request is handled by request handler
     */
    console.log('I am running before the handler', context);
    return next.handle().pipe(
      map((data: any) => {
        // run something before the response is send out
        console.log('I am running before response is send out');
      }),
    );
  }
}
