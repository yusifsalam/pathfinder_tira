# Requirements

- node 14
- yarn or npm (this project uses yarn, npm users will have to convert yarn commands to corresponding npm ones)

# Getting started

1. Clone the repository
1. `cd` into the cloned repository
1. Install the dependencies: `yarn`
1. Run one or more of the available scripts

# Available scripts

The following scripts can be used with `yarn` or `npm`:

- `start`: starts the react development server
- `build` : builds an optimized version of the react web app
- `typedoc`: creates a static html typedoc report
- `coverage`: createsa a static html coverage report
- `jest test`: runs all tests and outputs results in terminal

To upload the coverage report to Codecov, execute `CODECOV_TOKEN="your_token" bash <(curl -s https://codecov.io/bash)` in the terminal while using a valid Codecov token.
