# Week 2

## What was done

This week I implemented users' ability to select maps from a predefined list of available maps (courtesy of Moving AI labs).
I also set up and configured typedoc for automatic documentation generation. For typedoc to work nicely, I also added some comments to my code.
I configured Jest and added a few very simple unit tests. Jest now also produces a coverage report, which is also automatically pushed to Codecov.
Finally, I played around with rendering the maps inside the browser instead of just showing a static image.

## The progress

The logic and UI for selecting a map from the list is now implemented. Documentation and testing setup is now also done.

## Learning outcomes

Fetch can be used to fetch local files. Fetch does not work as expected with Jest.
Rendering a 1024x1024 array is very resource-heavy and slow, even when using canvas-based solutions.

## Problems

Fetch does not work as expected with Jest. As a workaround, I moved away from fetch and converted my map files to typescript files that export their data as strings.

## Next

Next week I will focus on the actual algorithm code.
