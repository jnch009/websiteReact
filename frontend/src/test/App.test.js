import rsaFn from '../components/rsa_generator';

describe('generate primes', () => {
  it('testing primes are generated', () => {
    var primes = rsaFn.generatePrimes();
    expect(primes.p1).not.toBe(-1);
    expect(primes.p2).not.toBe(-1);
  })

  it('testing prime number is being checked', () => {
    var primeNumber = 15485863;
    var nonPrime = 15485864;
    expect(rsaFn.isPrime(primeNumber)).toBe(true);
    expect(rsaFn.isPrime(nonPrime)).toBe(false);
  });
});

