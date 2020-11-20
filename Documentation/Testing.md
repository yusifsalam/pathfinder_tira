# Testing

Testing is split into the following categories:

- unit testing
- integration testing
- performance testing

### Unit tests

These tests check whether the individual pieces do what they are supposed to do.
At the moment all of the utility functions are unit tested.

### Integration tests

The purpose of these tests is to ensure that all of the pieces work are working together as intended.
At the moment no integration tests have been implemented.

### Performance tests

These tests determine whether the code performs within reasonable time and space constraints.
At the moment there are no performance tests. For performance testing, different maps from the Moving AI Labs will be used as input, and their time to completion, or how long it takes the algorithm to find a shortest route from one node to another, will be measured, as well as computational resources.

## Running tests

Unit and integration tests can be run with `yarn jest test`.
