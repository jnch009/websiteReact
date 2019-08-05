//1 pick two prime numbers

function generatePrimes(){
    var prime_1 = -1;
    var prime_2 = -1;
    var current;
    var min = 2; 
    var max = 1000;

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

    return {"p1": prime_1, "p2": prime_2}
}

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

export default {isPrime, generatePrimes};