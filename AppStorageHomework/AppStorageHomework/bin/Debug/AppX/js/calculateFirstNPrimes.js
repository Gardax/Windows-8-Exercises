/// <reference group="Dedicated Worker" />

var isPrime = function (number) {
    for (var i = 2; i < number; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
};

var calculateFirstNPrimes = function (N) {
    var primesList = new Array();
    var num = 1;
    while(primesList.length<N) {
        if (isPrime(num)) {
            primesList.push(num);
        }
        num++;
    }

    return primesList;
};

onmessage = function (event) {
    var result = calculateFirstNPrimes(event.data.number);

    postMessage(result);
};