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

 /*
There are a total of n courses you have to take, labeled from 0 to n-1.
Some courses may have prerequisites, 
for example to take course 0 you have to first take course 1, 
which is expressed as a pair: [0,1]

Given the total number of courses and a list of prerequisite pairs, 
is it possible for you to finish all courses?
 /*

 /**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    let adj = new Array(numCourses);
    let outDegrees = new Array(numCourses);
    for (let i=0; i<prerequisites.length; i++) {
        let edge = prerequisites[i];
        if (adj[edge[0]]) {
            adj[edge[0]].push(edge[1]);
        } else {
            adj[edge[0]] = [edge[1]];
        }
        if (outDegrees[edge[1]]) {
            outDegrees[edge[1]] += 1;
        } else {
            outDegrees[edge[1]] = 1;
        }
    }
    
    let queue = [];
    for (let i=0; i<numCourses; i++) {
        if (adj[i] === undefined) adj[i] = [];
        if (outDegrees[i] === undefined) queue.push(i)
    }
    let hitCourses = queue.length;
    while (queue.length > 0) {
        let leafCourse = queue.shift();
        for (let i=0; i<adj[leafCourse].length; i++) {
            let prereq = adj[leafCourse][i];
            outDegrees[prereq] -= 1;
            if (outDegrees[prereq] === 0) {
                hitCourses += 1;
                queue.push(prereq)
            }
        }
    }
    if (hitCourses === numCourses) return true;
    return false;
};