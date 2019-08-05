import rsaFn from '../components/rsa_generator';

it('primes function working', () => {
  var primeNumber = 15485863;
  var nonPrime = 15485864;
  expect(rsaFn.isPrime(primeNumber)).toBe(true);
  expect(rsaFn.isPrime(nonPrime)).toBe(false);
});
