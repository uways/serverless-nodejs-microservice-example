import { Module, HttpModule } from '@nestjs/common';
import { PaymentAPI } from './payment.api';

@Module({
  imports: [HttpModule],
  providers: [PaymentAPI],
  exports: [PaymentAPI],
})
export class ApiModule {
  constructor() {
    console.log('Constructing ApiModule');
  }
}
