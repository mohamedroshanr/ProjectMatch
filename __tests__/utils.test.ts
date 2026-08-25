import { cn } from '@/lib/utils';

describe('utils', () => {
  it('cn function merges classes correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
    expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
  });
});
