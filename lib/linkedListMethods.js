// Merge sort on a linked list
var sortList = function(head) {
    let headHead = new ListNode(null);
    headHead.next = head;
    let n = 0;
    let current = head;
    while (current) {
        n++;
        current = current.next;
    }
    
    let step = 1;
    while (step < n) {
        let tail = headHead;
        let curr = headHead.next;
        while (curr !== null) {
            let left = curr;
            let right = split(left, step);
            curr = split(right, step);
            tail = merge(left, right, tail);
        }
        step *= 2;
    }
    return headHead.next;
};

function split(head, n) {
    if (head === null) return head;
    for (let i=0; i<n-1; i++) {
        head = head.next;
        if (head === null) return head;
    }
    let second = head.next;
    head.next = null;
    return second;
}

function merge(left, right, tail) {
    let currTail = tail;
    while (left !== null && right !== null) {
        if (left.val < right.val) {
            currTail.next = left;
            left = left.next;
        } else {
            currTail.next = right;
            right = right.next;
        }
        currTail = currTail.next;
    }
    left ? currTail.next = left : currTail.next = right;
    while (currTail.next !== null) {
        currTail = currTail.next;
    }
    return currTail;


// End of Merge sort
