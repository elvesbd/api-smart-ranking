import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ChallengeStatus } from 'src/challenges/enum/challenge-status.enum';

export class ChallengeStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    ChallengeStatus.ACCEPTED,
    ChallengeStatus.DENIED,
    ChallengeStatus.CANCELLED,
  ];

  transform(value: any) {
    const status = value.status.toLowerCase();

    if (!this.ehStatusValid(status)) {
      throw new BadRequestException(`${status} is an invalid status!`);
    }
    return value;
  }

  private ehStatusValid(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
