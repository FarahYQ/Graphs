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

// Merge k lists (written in python)
// 
// # Definition for singly-linked list.
// # class ListNode:
// #     def __init__(self, x):
// #         self.val = x
// #         self.next = None

// class Solution:
//     def mergeKLists(self, lists):
//         """
//         :type lists: List[ListNode]
//         :rtype: ListNode
//         """
//         lists = [x for x in lists if x]
//         if not lists :
//             return 
//         head = ListNode(0)
//         h = []
//         for i, ls in enumerate(lists):
//             heapq.heappush(h, (ls.val, i))
//         res = head
//         while h:
//             val, ind = heapq.heappop(h)
//             if lists[ind]:
//                 ls = lists[ind]
//                 res.next = ls
//                 res = res.next
//                 lists[ind] = ls.next
//             if lists[ind]:
//                 heapq.heappush(h, (lists[ind].val, ind))
//         return head.next


// Delete duplicates from linked list

var deleteDuplicates = function(head) {
    if (!head) return head;
    let nodeTracker = {};
    let blankHead = new ListNode(null);
    blankHead.next = head;
    let prev = blankHead;
    let curr = head;
    while (curr.next) {
        if (curr.val !== curr.next.val) {
            prev = prev.next;
            // curr = curr.next;
        } else {
            let currVal = curr.val;
            while (curr.next && currVal === curr.next.val) {
                curr = curr.next;
            }
            prev.next = curr.next;
        }
        if (curr.next) curr = curr.next;
    }
    return blankHead.next;
};
