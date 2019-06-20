/**
 * get input array
 * calculate cost per center ( put it in 3x1 array)
 * apply floyd-warshall from c1
*/
function min(a, b) {
    return (a < b) ? a : b;
}
// order = C1, C2, C3, L1
var distanceGraph = [
    [0, 4, Infinity, 3],
    [4, 2, 3, 2.5],
    [Infinity, 3, 0, 2],
    [3, 2.5, 2, 0],
];
var currentWeight = 0;
var maxCost = 0;
var inputArray;
function floydWarshal() {
    var graph = distanceGraph;
    var k, i, j;
    for (k = 0; k < 4; k++) {
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                graph[i][j] = min(graph[i][k] + graph[k][j], graph[i][j]);
            }
        }
    }
    return graph;
}
function start() {
    console.log('Original:');
    console.log(distanceGraph);
    console.log('\n\n');
    console.log('after Algo:');
    console.log(floydWarshal());
}
start();
