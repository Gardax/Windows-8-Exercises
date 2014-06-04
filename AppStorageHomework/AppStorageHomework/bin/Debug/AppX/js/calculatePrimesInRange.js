/// <reference group="Dedicated Worker" />

var isPrime = function (number) {
    for (var i = 2; i < number; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
};

var calculatePrimesInRange = function (startNumber, endNumber) {
    var primesList = new Array();

    var ind = 0;
    for (var ind = startNumber; ind < endNumber; ind++) {
        if (isPrime(ind)) {
            primesList.push(ind);
        }
    }

    return primesList;
};

onmessage = function (event) {
    var result = calculatePrimesInRange(event.data.startNumber, event.data.endNumber);

    postMessage(result);
};
