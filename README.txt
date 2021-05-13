How to run the project:

Inside project directory, run 'yarn' to install all the dependencies. Once complete, run 'yarn start' to start the project.

Installed dependecies:
-Theme-UI 
-styled-components

The combination of these two libraries allows me to create useable components that are prestyled.

Thought Process:
- Load the first 30 thumbnail pictures by utlizing UseEffect hook so it does not affect any other content on the page. 
- Challenge I faced: how can I implement lazy loading so that when a user scrolls to a certain spot of the page, the fetchImages function is called again to fetch more thumbnails to display?
- Resource referenced for lazy loading: https://www.youtube.com/watch?v=NZKUirTtxcg

