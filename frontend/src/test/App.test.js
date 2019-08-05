import rsaFn from '../components/rsa_generator';

describe('generate primes', () => {
  it('testing primes are generated', () => {
    var primes = rsaFn.generatePrimes();
    expect(primes.p1).not.toBe(-1);
    expect(primes.p2).not.toBe(-1);
  })

  it('testing prime number', () => {
    var primeNumber = 15485863;
    expect(rsaFn.isPrime(primeNumber)).toBe(true);
  });

  it('testing not a prime number', () => {
    var nonPrime = 15485864;
    expect(rsaFn.isPrime(nonPrime)).toBe(false);
  })
});

it('remove the common factors', () => {
  var p1 = 2;
  var p2 = 7;
  var res = 6;
  expect(rsaFn.removeCommonFactors(p1,p2)).toBe(res);
})

describe('testing Coprime', () => {
  it('not coprime', () => {
    var n1 = 100;
    var n2 = 200;
    expect(rsaFn.isCoprime(n1,n2)).toBe(false);
  })

  it('is coprime', () =>{
    var n1 = 14;
    var n2 = 15;
    expect(rsaFn.isCoprime(n1,n2)).toBe(true);
  })

  it('negative case', () => {
    var n1 = -2;
    var n2 = -5;
    expect(rsaFn.isCoprime(n1,n2)).toBe(false);
  })

  it('generate rsa key with coprime', () => {
    expect(rsaFn.coPrime(6,14)).toBe(5);
  })
})