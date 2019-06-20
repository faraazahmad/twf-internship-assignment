/**
 * get input array
 * calculate cost per center ( put it in 3x1 array)
 * apply floyd-warshall from c1
*/

function min(a: number, b: number): number {
    return (a < b) ? a : b;
}

/* 
    order:  C1, C2, C3, L1
            C1,
            C2,
            C3,
            L1
*/
const distanceGraph = [
    [0, 4, Infinity, 3],
    [4, 2, 3, 2.5],
    [Infinity, 3, 0, 2],
    [3, 2.5, 2, 0],
];

// Choice: Ci -> L1
function one(weights: number[]): number {
    // get center
    let center;
    for (let i = 0; i < 3; i++) {
        if (weights[i] > 0) {
            center = i;
            break;
        }
    }

    return getCostPerUnit(weights[center]) * distanceGraph[center][3];
}

function getCostPerUnit(weight: number): number {
    return (weight > 5) ? 8 : 10;
}

function two(weights: number[]): number {
    // get centers
    let centers: number[];
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
     *  Cj -> Ci -> L1
     *  Cj -> L1 -> Ci -> L1
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

function three(weights: number[]) {
    
}

function getNumCenters(weights: number[]): number {
    let num = 0;
    weights.forEach(w => {
        if (w > 0) {
            num++;
        }
    });

    return num;
}

function start() {
    let input  = [1, 2, 0,  0, 0, 0,  0, 0, 0];
    let weights = [];
    for (let i = 0; i < 9; i++) {
        let sum = 0;

        if ((i + 1) % 3 == 0) {
            weights.push(sum);
            sum = 0;
        }
        else {
            sum += input[i];
        }
    }

    switch (getNumCenters(weights)) {
        case 1:
            one(weights);
            break;

        case 2:
            two(weights);
            break;
        
        case 3:
            three(weights);
            break;

        default:
            console.log('Wrong input');
            break;
    }

}

start();