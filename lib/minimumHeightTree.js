/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 *
 */
var findMinHeightTrees = function(n, edges) {
    // {0: [3], 1: [3], 2: [3], 3: [0,1,2,4], 4: [3,5], 5: [4] }
    // {0: [1], 1: [0,1,2], 2: [1], 3: [1]}
    if (n <= 1) return [0]
    let edgeTracker = {};
    for (let i=0; i<edges.length; i++) {
        if (edgeTracker[edges[i][0]]) {
            edgeTracker[edges[i][0]].push(edges[i][1]);
        } else {
            edgeTracker[edges[i][0]] = [edges[i][1]]
        }
        if (edgeTracker[edges[i][1]]) {
            edgeTracker[edges[i][1]].push(edges[i][0]);
        } else {
            edgeTracker[edges[i][1]] = [edges[i][0]]
        }
    }
    let leaves = [];
    for (let i=0; i<n; i++) {
        if (edgeTracker[i].length === 1) leaves.push(i)
    }
    let roots = [];
    while (n > 2) {
        let roots = [];
        n -= leaves.length;
        for (let k=0; k<leaves.length; k++) {
            let i = leaves[k];
            let j = edgeTracker[i].pop();
            // edgeTracker[j].shift();
            let i_idx = edgeTracker[j].indexOf(i);
            edgeTracker[j] = edgeTracker[j].slice(0,i_idx).concat(edgeTracker[j].slice(i_idx+1, edgeTracker[j].length))
            if (edgeTracker[j].length === 1) roots.push(j);
        }
        leaves = roots;
    }
    return leaves;
 };