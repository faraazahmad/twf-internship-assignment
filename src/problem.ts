/* 
    order:  C1, C2, C3, L1
            C1,
            C2,
            C3,
            L1
*/
const distanceGraph = [
    [0, 4, 5, 3],
    [4, 2, 3, 2.5],
    [5, 3, 0, 2],
    [3, 2.5, 2, 0],
];

const stockWeight = [
    3, 2, 8,
    12, 25, 15,
    0.5, 1, 2,
];

function min(a: number, b: number): number {
    return (a < b) ? a : b;
}

// check if weight is lower or greater than 5 kgs and give cost for trip
function getCostPerUnit(weight: number): number {
    return (weight > 5) ? 8 : 10;
}

// check for number of centers in weights array (length 3)
function getNumCenters(weights: number[]): number {
    let num = 0;
    weights.forEach(w => {
        if (w > 0) {
            num++;
        }
    });

    return num;
}

// 
function getWeightsSum(weights: number[], limit: number): number {
    let sum = 0;
    for (let i = 0; i < limit; i++) {
        sum += weights[i];
    }

    return sum;
}

// Choice: Ci -> L1
function one(weights: number[]): number {
    // get center
    let i;
    for (i = 0; i < 3; i++) {
        if (weights[i] > 0) {
            break;
        }
    }

    return getCostPerUnit(weights[i]) * distanceGraph[i][3];
}


function two(weights: number[]): number {
    // get centers
    let centers: number[] = [];
    for (let i = 0; i < 3; i++) {
        if (weights[i] > 0) {
            centers.push(i);
        }
    }

    /**
     * Choices:
     *  Ci -> Cj -> L1
     *  Ci -> L1 -> Cj -> L1
     * 
     *  (+ permutations of Ci and Cj interchanged)
     */
    let cost: number;
    let minCost = Infinity;

    for (let i = 0; i < 2; i++) {
        cost = 0;
        cost += getCostPerUnit(weights[i]) * 
                    distanceGraph[centers[i]][centers[(i + 1) % 2]];
        
        cost += getCostPerUnit(weights[i] + weights[i + 1]) * 
                    distanceGraph[centers[(i + 1) % 2]][3];
        
        minCost = min(minCost, cost);

        cost = 0;
        cost += getCostPerUnit(weights[i]) *
                     distanceGraph[centers[i]][3];
        
        cost += getCostPerUnit(0) *
                    distanceGraph[3][centers[(i + 1) % 2]];
        
        cost += getCostPerUnit(weights[(i + 1) % 2]) *
                    distanceGraph[centers[(i + 1) % 2]][3];

        minCost = min(minCost, cost);
    }

    return minCost;
}

/**
 * Choices:
 * 
 *  Ci -> Cj -> Ck -> L1
 *  Ci -> Cj -> L1 -> Ck -> L1
 *  Ci -> L1 -> Cj -> Ck -> L1
 *  Ci -> L1 -> Cj -> L1 -> Ck -> L1
 * 
 *  (+ permutations of Ci, Cj, Ck interchanged)
 */
function three(weights: number[]): number {
    let cost: number;
    let minCost = Infinity;

    for (let i = 0; i < 3; i++) {
        // Ci -> Cj -> Ck -> L1
        cost = 0;
        cost += getCostPerUnit(getWeightsSum(weights, 1)) *
                    distanceGraph[i][(i + 1) % 3];
        cost += getCostPerUnit(getWeightsSum(weights, 2)) *
                    distanceGraph[(i + 1) % 3][(i + 2) % 3];
        cost += getCostPerUnit(getWeightsSum(weights, 3)) *
                    distanceGraph[(i + 2) % 3][3];
        
        minCost = min(minCost, cost);

        // Ci -> Cj -> L1 -> Ck -> L1
        cost = 0;
        cost += getCostPerUnit(weights[i]) *
            distanceGraph[i][(i + 1) % 3];
        cost += getCostPerUnit(getWeightsSum(weights, 2)) *
            distanceGraph[(i + 1) % 3][3];
        cost += getCostPerUnit(0) *
                    distanceGraph[3][(i + 2) % 3];
        cost += getCostPerUnit(weights[(i + 2) % 3]) *
            distanceGraph[(i + 2) % 3][3];
        
        minCost = min(minCost, cost);

        // Ci -> L1 -> Cj -> Ck -> L1
        cost = 0;
        cost += getCostPerUnit(weights[i]) *
            distanceGraph[i][3];
        cost += getCostPerUnit(0) *
            distanceGraph[3][(i + 1) % 3];
        cost += getCostPerUnit(weights[(i + 1) % 3]) *
            distanceGraph[(i + 1) % 3][(i + 2) % 3];
        cost += getCostPerUnit(weights[(i + 1) % 3] + weights[(i + 2) % 3]) *
            distanceGraph[(i + 2) % 3][3];

        minCost = min(minCost, cost);

        // Ci -> L1 -> Cj -> L1 -> Ck -> L1
        cost = 0;
        cost += getCostPerUnit(weights[i]) *
            distanceGraph[i][3];
        cost += getCostPerUnit(0) *
            distanceGraph[3][(i + 1) % 3];
        cost += getCostPerUnit(weights[(i + 1) % 3]) *
            distanceGraph[(i + 1) % 3][3];
        cost += getCostPerUnit(0) *
            distanceGraph[3][(i + 2) % 3];
        cost += getCostPerUnit(weights[(i + 2) % 3]) *
            distanceGraph[(i + 2) % 3][3];
        
        minCost = min(minCost, cost);
    }

    return minCost;
}


export function getSolution(input: number[]): number | Error {
    let weights = [];
    let sum = 0;

    for (let i = 0; i < 9; i++) {
        if ((i + 1) % 3 == 0) {
            weights.push(sum);
            sum = 0;
        }
        else {
            sum += input[i] * stockWeight[i];
        }
    }    

    switch (getNumCenters(weights)) {
        case 1:
            return one(weights);

        case 2:
            return two(weights);
        
        case 3:
            return three(weights);

        default:
    }
    return new Error('Wrong input');
}