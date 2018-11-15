/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 *
 */
var findMinHeightTrees = function(n, edges) {
    // {0: [3], 1: [3], 2: [3], 3: [0,1,2,4], 4: [3,5], 5: [4] }
    // {0: [1], 1: [0,1,2], 2: [1], 3: [1]}
    if (n === 1) return [0];
    if (n === 2) return edges[0];
    let roots = [];
    let ob = {};
    for (let i = 0; i < edges.length; i++) {
        let node1 = edges[i][0];
        let node2 = edges[i][1];
        if (ob[node1]) {
            ob[node1].push(node2)
        } else {
            ob[node1] = [node2]
        }
        if (ob[node2]) {
            ob[node2].push(node1)
        } else {
            ob[node2] = [node1]
        }
    }
    for (let i = 0; i < n; i++) {
        if (ob[i].length > 1) roots.push(i);
    }
    return roots;
};