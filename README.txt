How to run the project:
Inside project directory, run 'yarn' to install all the dependencies. Once complete, run 'yarn start' to start the project.

Installed dependecies:
-Theme-UI 
-styled-components

The combination of these two libraries allows me to create useable components that can be styled and exported without depending on CSS classes.

Inintial Thought Process:
- When I first saw the task, I thought of iterating all 100,000+ images and storing them in the cache so it could be accessed but this method was a waste of memory. It also did not fit the requirement of the challenge.
- The afterthought was to lazy load the images somehow as the user is scrolling through the thumbnails but the challenge was that I didn't know how to do lazy load once it hits the last element of the content.

Assumption:
- Reference to online tutorials on implementations I'm not familiar with is not against the rule of the challenge.
- 3 image per row at 100% width of the image is a strict requirement.

Implementation Process:
- Initiated empty React project with npx create-react-app and removed all unncessary files.
- Created a function to load 30 thumbnail pictures and stored them in a thumbnails list state. 
- Initialized the page by loading the first 30 intervals in UseEffect hook to make sure I was loading the thumbnails correctly.
- Mapped through each thumbnail to display them in a row of 3 using a Grid component

----how to create lazy loading----
- referenced https://www.youtube.com/watch?v=NZKUirTtxcg on how to use useRef and IntersectionObserver to lazy load thumbnails before user reaches the end of page

----refactoring to make the component more reusable----
- referenced react-infinite-scroll-compoent (https://www.npmjs.com/package/react-infinite-scroll-component) to think about what props should be passed in into my custom component to make it as reusable as possible.
- custom component now take in required props which are:
    - fetchContent refers to a function that gets called to fetch more images when it reaches the end
    - hasMore refers to at what point should the infinite scroll should stop fetching for new content
    - content refers to the data that needs to be mapped and displayed to the user. In our case, thumbnails were passed from parent to the custom component to be parsed for the img href 
        - content is strictly strings of image href.

----can the custom infinite scroll render different components that are not of img?----
- yes but for the requirement and time stake of this task, only imgs are supported, HOWEVER, to support other elements, it can be refactored
- on the parent level of the component, developer can pass down a list of elements to be rendered as props which then at the custom infinite scroll level, it just needs to simply map through and return each element, and last index of item will need to pass the speical ref observer.

----bonus functionality----
- I thought it would be nice UX to have a scroll to top button for user to click when user wants to scroll back to top
- referenced https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/