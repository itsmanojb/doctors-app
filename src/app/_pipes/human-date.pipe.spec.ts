import { HumanDatePipe } from './human-date.pipe';

describe('HumanDatePipe', () => {
  it('create an instance', () => {
    const pipe = new HumanDatePipe();
    expect(pipe).toBeTruthy();
  });
});
