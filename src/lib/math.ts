// Opposite to % (reminder) operation, this function should return actual Euclidean modulo
export function mod(dividend: number, divisor: number): number {
  const reminder = dividend % divisor;
  return reminder < 0 ? reminder + divisor : reminder;
}
