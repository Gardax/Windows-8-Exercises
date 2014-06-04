/// <reference group="Dedicated Worker" />

var isPrime = function (number) {
    for (var i = 2; i < number; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
};

var calculatePrimesToN = function (N) {
    var primesList = new Array();

    for (var ind = 1; ind <= N; ind++) {
        if (isPrime(ind)) {
            if (primesList.length < N) {
                primesList.push(ind);
            } else {
                break;
            }
        }
    }

    return primesList;
};

onmessage = function (event) {
    var result = calculatePrimesToN(event.data.number);

    postMessage(result);
};