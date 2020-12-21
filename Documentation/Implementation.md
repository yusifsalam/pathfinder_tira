# Implementation

## Project structure

The project structure is the following:

```
├── Documentation: contains documentation files
├── __tests__: test files
├── build: optimized build of the app
├── coverage: lcov coverage report
├── node_modules: project libraries
├── public: public folder of the app
├── src: source files for the code
└── typedoc: typedoc html files and resources

8 directories
```

src folders consisnts of the following

```
├── algorithms: files related to algorithm implementation
│   └── core: data structures
├── helpers: helper function
├── maps: maps for benchmarking
└── ui: UI related React code

5 directories
```

## Algorithm implementation

Three pathfinding algorithms were implemented - these are A\*, Dijsktra, and Jump Point Search (JPS).

### Dijsktra

Dijkstra is a special case of A\* where the heuristic is 0. As such, it was implemented after A\* by simply substituting the heuristic function.

### A\*

The implementation is very similar to any other A\* implementation - two lists are keeping track of opened and closed nodes and expanding outwards from the starting node until the destination is reached. Two optimizations are done here:

1. closed list is omitted entirely, as the information about whether a node is closed or not is stored in the node itself
1. Before starting the for-loop that checks if the open list is empty, every node in the grid is preproccessed to have their heuristic calculated and if the node isn't walkable, it's marked closed and not checked in the main loop.

The implemetation of A\* assumes octile heuristic, meaning that diagonal movement is allowed (and prioritized since it's more efficient).

### JPS

The implementation is fairly similar to A*. There is an open list that keeps track of nodes to expand and the closed list is omitted in favor of the nodes containing the information about whether they've been visited or not. The key difference to A* is that the algorithm is able to skip "uninteresting" nodes and go straight to the so-called jump nodes.

## Flaws and possible improvements

Open list is a simple javascript array, which comes with limitations. Converting the array to a binary heap has the potential to significantly speed up the algorithms. Specifically, the operation where the next node is picked from the open list by checking for the lowest f-value would be magnitudes of order faster.

## Sources

- Tietorakenteet ja algoritmit course
- A\* Pathfinding (E01: algorithm explanation) by Sebastian Lague: https://youtu.be/-L-WgKMFuhE
- https://brilliant.org/wiki/a-star-search/
- https://zerowidth.com/2013/a-visual-explanation-of-jump-point-search.html
