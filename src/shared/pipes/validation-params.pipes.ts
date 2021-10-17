import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ValidationParamsPipes implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(
        `the parameter value ${metadata.data} must be entered`,
      );
    }

    return value;
  }
}
// esse exemplo foi usado no delete mas passando @Query e não @Param
