function generateRSAToken(){
    var primesAndMod = generatePrimes();
    var L =  removeCommonFactors(primesAndMod.prime_1,primesAndMod.prime_2);
    return coPrime(L,primesAndMod.modulus);
}

//1 pick two prime numbers (these are private)

function isPrime(p){
    if (p <= 1){
        return false;
    } else if (p == 2){
        return true;
    }

    let start = 2;
    let end = Math.sqrt(p);

    while (start < end){
        if (p % start == 0 || p % end == 0){
            return false;
        }
        start += 1;
        end -= 1;
    }

    return true;
}

//generate primes and modulus
function generatePrimes(){
    var prime_1 = -1;
    var prime_2 = -1;
    var current;
    var min = 10000; 
    var max = 50000;

    while (prime_1 == -1 || prime_2 == -1){
        if (prime_1 == -1){
            current = Math.round(Math.random() * (max - min) + min);
            if (isPrime(current)){
                prime_1 = current;
            }
        } else {
            current = Math.round(Math.random() * (max - min) + min);
            if (isPrime(current) && current != prime_1){
                prime_2 = current;
            }
        }
    }

    return {"p1": prime_1, "p2": prime_2, "modulus": prime_1*prime_2}
}

//3 get the length of the no common factors with the modulus between 1 and modulus
function removeCommonFactors(p1, p2){
    return ((p1-1) * (p2-1));
}

//4 coprime with L and the modulus
function coPrime(upper, modulus){
    var publicKey;
    for (var i = 2; i < upper; i++){
        if (isCoprime(upper,i) && isCoprime(modulus,i)){
            publicKey = i;
            break;
        }
    }
    return publicKey;
}

function isCoprime(num_1,num_2){
    if (num_1 < 0 || num_2 < 0){
        return false;
    }

    var smaller;
    if (num_1 <= num_2){
        smaller = num_1;
    } else {
        smaller = num_2;
    }

    for (var i = 2; i <= smaller; i++){
        if (num_1 % i == 0 && num_2 % i == 0){
            return false;
        }
    }

    return true;
}

export default {isPrime, 
                generatePrimes, 
                removeCommonFactors,
                generateRSAToken,
                isCoprime,
                coPrime};