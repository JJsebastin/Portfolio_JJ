Title: Graph Algorithms and Complexities
Date: MAY 09, 2026
Tags: ALGORITHMS, DATA STRUCTURES, GRAPHS
Excerpt: A comprehensive overview of essential graph algorithms, their time and space complexities, and fundamental theorems including DFS, BFS, Dijkstra's, and more.

# Graph Basics

![Complexity of Graph Algorithms](blogs/image.png)

-------------
----


## Depth-First Search (DFS)

**Complexity**
* **Time:** $O(V+E)$ using an adjacency list; $O(V^2)$ using an adjacency matrix.
* **Space:** $O(V)$ for the recursion stack and visited arrays.

**Theorems**
* **Parenthesis Theorem:** In any DFS, the discovery time $u.d$ and finish time $u.f$ of any two vertices $u$ and $v$ form a well-nested parenthesis structure. The intervals $[u.d, u.f]$ and $[v.d, v.f]$ are either completely disjoint, or one is entirely contained within the other (meaning one vertex is a descendant of the other).
* **White-Path Theorem:** A vertex $v$ is a descendant of $u$ in the DFS forest if and only if, at the exact time $u$ is discovered ($u.d$), there is a path from $u$ to $v$ consisting entirely of white (undiscovered) vertices.
* **Edge Classification (Undirected):** In a DFS of an undirected graph, every edge is either a tree edge or a back edge. There are no forward or cross edges.
* **Cycle Detection Lemma:** A directed graph is acyclic (a DAG) if and only if a DFS yields no back edges.

---
---


## Breadth-First Search (BFS)

**Complexity**
* **Time:** $O(V+E)$ using an adjacency list.
* **Space:** $O(V)$ for the FIFO queue.

**Formulas & Properties**
* **Distance Bound:** For any edge $(u,v)$, the shortest path distance satisfies $\delta(s,v) \le \delta(s,u) + 1$.

**Theorems**
* **Shortest Path Correctness:** BFS discovers every vertex $v$ reachable from the source $s$. Upon termination, the recorded distance $v.d$ exactly equals the true shortest-path distance $\delta(s,v)$ (in terms of the number of edges).
* **Queue Monotonicity:** If the queue contains vertices $\langle v_1, v_2, \dots, v_r \rangle$, then the distance of the tail is at most one greater than the head: $v_r.d \le v_1.d + 1$, and $v_i.d \le v_{i+1}.d$ for all $i$.
* **Cross Edges:** In an undirected graph, all non-tree edges explored by BFS are cross edges.

---
---

## Dijkstra's Algorithm

**Complexity**
* **Time:** $O((V+E)\log V)$ using a Binary Heap; $O(V\log V+E)$ using a Fibonacci Heap; $O(V^2)$ using an unsorted array.
* **Space:** $O(V)$ for the priority queue and distance array.

**Formulas**
* **Edge Relaxation:** $$v.d = \min(v.d, u.d + w(u,v))$$

**Theorems**
* **Triangle Inequality:** For any edge $(u,v)$, the shortest path distance satisfies $\delta(s,v) \le \delta(s,u) + w(u,v)$.
* **Upper-Bound Property:** The estimate $v.d$ is always $\ge \delta(s,v)$. Once $v.d$ reaches $\delta(s,v)$, it never changes.
* **Correctness Theorem:** If all edge weights are non-negative ($w(u,v) \ge 0$), whenever a vertex $u$ is extracted from the priority queue and added to the shortest-path tree, its distance $u.d$ is exactly equal to the shortest path distance $\delta(s,u)$.

---
---

## Bellman-Ford Algorithm

**Complexity**
* **Time:** $O(V \times E)$.
* **Space:** $O(V)$.

**Formulas**
* **Iteration:** The relaxation formula $v.d = \min(v.d, u.d + w(u, v))$ is strictly applied to all edges exactly $V-1$ times.

**Theorems**
* **Path-Relaxation Property:** If a shortest path exists, its edges will be sequentially relaxed over the $V-1$ iterations, guaranteeing $v.d = \delta(s,v)$ upon termination.
* **Correctness and Cycle Detection:** If the graph contains no negative-weight cycles reachable from the source, the algorithm computes correct shortest paths. If after $V-1$ iterations, there is still an edge $(u,v)$ where $v.d > u.d + w(u,v)$, the algorithm correctly reports that a negative-weight cycle exists.


---
---


## Floyd-Warshall Algorithm

**Complexity**
* **Time:** $O(V^3)$.
* **Space:** $O(V^2)$ (can be optimized to $O(V)$ space by keeping only the current and previous distance matrices).

**Formulas**
* **Dynamic Programming Recurrence:** Let $d_{ij}^{(k)}$ be the shortest path from $i$ to $j$ using only vertices from $\{1, 2, \dots, k\}$ as intermediate vertices.
    $$d_{ij}^{(k)} = \min\left(d_{ij}^{(k-1)}, d_{ik}^{(k-1)} + d_{kj}^{(k-1)}\right)$$

**Theorems**
* **Optimal Substructure:** A shortest path from $i$ to $j$ with intermediate vertices up to $k$ either does not go through $k$ (hence is the shortest path up to $k-1$), or it consists of a shortest path from $i$ to $k$ and a shortest path from $k$ to $j$, both only using intermediate vertices up to $k-1$.
* **Negative Cycle Detection:** A negative-weight cycle exists if and only if any diagonal element $d_{ii}^{(n)}$ becomes strictly less than $0$.


---
---


## Prim's Algorithm

**Complexity**
* **Time:** $O(E\log V)$ using a Binary Min-Heap; $O(E + V\log V)$ using a Fibonacci Heap; $O(V^2)$ using an adjacency matrix and unsorted array.
* **Space:** $O(V)$ for the priority queue and tracking arrays.

**Formulas**
* **Vertex Selection:** Selects the vertex $v$ outside the growing tree $A$ that minimizes the edge weight connecting it to $A$.
    $$v.key = \min(v.key, w(u, v))$$

**Theorems**
* **Safe Edge (Cut) Theorem:** Let $(S, V-S)$ be any cut of the graph that respects the currently chosen MST edges $A$. If $(u,v)$ is the lightest edge crossing this cut, then $(u,v)$ is a "safe edge" and must belong to a minimum spanning tree.
* **Tree Growth:** Prim's algorithm maintains the invariant that the edges in the selected set $A$ always form a single, contiguous tree.

---

## Kruskal's Algorithm

**Complexity**
* **Time:** $O(E\log E)$ or $O(E\log V)$. Sorting the edges takes $O(E\log E)$ time, and the Union-Find operations take $O(E \alpha(V))$ time, where $\alpha$ is the inverse Ackermann function.
* **Space:** $O(V)$ for the Union-Find data structure.

**Formulas**
* **Union-Find Operations:** Relies on `Find-Set(u) != Find-Set(v)` to detect if an edge forms a cycle, followed by `Union(u, v)` to merge components.

**Theorems**
* **Global Lightest Edge:** The algorithm builds the MST as a forest. By sorting edges globally and iterating from lightest to heaviest, it inherently satisfies the Cut Theorem. If an edge connects two disjoint trees in the forest, it is the lightest edge crossing the cut between those two sets of vertices, making it safe to add.