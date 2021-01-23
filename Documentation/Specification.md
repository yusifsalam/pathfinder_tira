# Project specification

This project is implemented as part of the Bachelor's program in Computer Science at the University of Helsinki. The project and, as such, the documentation language is English.

## Problem statement

There are various pathfinding algorithms in existence, each with their strengths and weaknesses. This project aims to compare the performances of some of the most prominent pathfinding algorithms for a number of concrete 2D maps.

## Data structures and algorithms

The algorithms used in comparisons are A-star, Dijkstra and JPS.

Data structures to be implemented are priority queue, stack and different array operations. These data structures are known requirements for solving graph/node problems. Because the course does not allow for the use of ready-made data structures, they will have to be implemented from scratch.

## Program input

Graphs used for the comparisons will be picked from the 2D maps provided by [Moving AI labs](https://movingai.com/benchmarks/grids.html).

If time allows, upload and use of custom user-defined maps will be implemented. In the meanwhile, the users will be able to pick from a predefined list of maps.

## Technology stack

The program is a simple React web app, written in TypeScript. Chakra UI was be used for rapidly building the UI of the application. While the emphasis of the project is on the technical implementation of the data structures and algorithms, it is planned to be implemented in a sustainable way (respecting coding styles and good practices) and look visually appealing.

## Sources

- Tietorakenteet ja algoritmit course
- A\* Pathfinding (E01: algorithm explanation) by Sebastian Lague: https://youtu.be/-L-WgKMFuhE
- https://brilliant.org/wiki/a-star-search/
- http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
