/**
 * get input array
 * calculate cost per center ( put it in 3x1 array)
 * apply floyd-warshall from c1
*/

function min(a: number, b: number): number {
    return (a < b) ? a : b;
}

// order = C1, C2, C3, L1
const distanceGraph = [
    [0, 4, Infinity, 3],
    [4, 2, 3, 2.5],
    [Infinity, 3, 0, 2],
    [3, 2.5, 2, 0],
];

function one(weights: number[]): number {
    // get center
    let center;
    for (let i = 0; i < 3; i++) {
        if (weights[i] > 0) {
            center = i;
            break;
        }
    }

    // return cost
    if (weights[center] > 5) {
        return distanceGraph[center][3] * 8;
    }
    else {
        return distanceGraph[center][3] * 10;
    }
}

function two(weights: number[]) {
    
}

function three(weights: number[]) {
    
}

function floydWarshal(): number[][] {
    let graph = distanceGraph;
    let k: number,
    i: number,
    j : number;

    for (k = 0; k < 4; k++) {
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                graph[i][j] = min(graph[i][k] + graph[k][j], graph[i][j]);
            }
        }
    }

    return graph;
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