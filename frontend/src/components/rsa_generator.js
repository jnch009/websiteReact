//1 pick two prime numbers

function generatePrimes(){

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

export default {isPrime};