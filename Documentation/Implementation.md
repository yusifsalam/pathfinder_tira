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

The code structure at the moment is the following:

```
src/
├── App.tsx
├── Grid.tsx
├── astar
│   ├── grid.ts
│   └── node.ts
├── index.tsx
├── maps
│   ├── allMaps.ts
│   ├── maze32-0-0.ts
│   ├── maze512-1-0.ts
│   ├── maze512-1-1.map
│   ├── maze512-1-2.map
│   ├── maze512-1-3.map
│   ├── maze512-1-4.map
│   ├── maze512-1-5.map
│   ├── maze512-1-6.map
│   ├── maze512-1-7.map
│   ├── maze512-1-8.map
│   ├── maze512-1-9.map
│   ├── maze512-16-0.map
│   ├── maze512-16-1.map
│   ├── maze512-16-2.map
│   ├── maze512-16-3.map
│   ├── maze512-16-4.map
│   ├── maze512-16-5.map
│   ├── maze512-16-6.map
│   ├── maze512-16-7.map
│   ├── maze512-16-8.map
│   ├── maze512-16-9.map
│   ├── maze512-2-0.map
│   ├── maze512-2-1.map
│   ├── maze512-2-2.map
│   ├── maze512-2-3.map
│   ├── maze512-2-4.map
│   ├── maze512-2-5.map
│   ├── maze512-2-6.map
│   ├── maze512-2-7.map
│   ├── maze512-2-8.map
│   ├── maze512-2-9.map
│   ├── maze512-32-0.map
│   ├── maze512-32-1.map
│   ├── maze512-32-2.map
│   ├── maze512-32-3.map
│   ├── maze512-32-4.map
│   ├── maze512-32-5.map
│   ├── maze512-32-6.map
│   ├── maze512-32-7.map
│   ├── maze512-32-8.map
│   ├── maze512-32-9.map
│   ├── maze512-4-0.map
│   ├── maze512-4-1.map
│   ├── maze512-4-2.map
│   ├── maze512-4-3.map
│   ├── maze512-4-4.map
│   ├── maze512-4-5.map
│   ├── maze512-4-6.map
│   ├── maze512-4-7.map
│   ├── maze512-4-8.map
│   ├── maze512-4-9.map
│   ├── maze512-8-0.map
│   ├── maze512-8-1.map
│   ├── maze512-8-2.map
│   ├── maze512-8-3.map
│   ├── maze512-8-4.map
│   ├── maze512-8-5.map
│   ├── maze512-8-6.map
│   ├── maze512-8-7.map
│   ├── maze512-8-8.map
│   └── maze512-8-9.map
├── setupTests.ts
├── types.d.ts
└── utils
    ├── listMaps.ts
    └── readMap.ts

3 directories, 72 files
```

## Time and space complexity

## Flaws and possible improvements

## Sources

- Tietorakenteet ja algoritmit course
- A\* Pathfinding (E01: algorithm explanation) by Sebastian Lague: https://youtu.be/-L-WgKMFuhE
- https://brilliant.org/wiki/a-star-search/
