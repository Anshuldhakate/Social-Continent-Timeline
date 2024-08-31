# Social-Continent-Timeline

### Overview

My Social-Continent-Timeline App is a web application that allows users to interact with posts through liking, commenting, and reposting. The application uses React and Redux for state management and follows modern best practices for a responsive and dynamic user experience.

### Architecture

- **Frontend**: Built with React.js, utilizing functional components and hooks.
- **State Management**: Managed with Redux, incorporating asynchronous actions and reducers to handle state updates.
- **Backend**: Simulated with `https://api.socialcontinent.xyz/api/v1/post/suggested` for API interactions.
- **Styling**: Custom CSS styles, focusing on dark themes and responsive design.

### State Management

The state management is handled using Redux. Key components include:

- **Actions**: Defined for fetching posts, liking posts, adding comments, and reposting posts.
- **Reducers**: Handle state updates based on dispatched actions.
- **Async Thunks**: Manage asynchronous API interactions and dispatch appropriate actions upon success or failure.

### API Interaction

- **simulateApiCall**: A placeholder function for simulating API calls. Replace with real API endpoints in a production environment.
- **Actions**:
  - `likePost`: Sends a request to like a post.
  - `addComment`: Sends a request to add a comment to a post.
  - `repostPost`: Sends a request to repost an existing post.

### Setup and Running the Application

#### Prerequisites

- Node.js (v14 or later)
- npm or yarn

#### Installation

      1. Clone the repository:
         ```bash
         git clone <repository-url>
         cd <repository-directory>
      
      2. Install dependencies:
        ```bash
         npm install.

3. Running the Application
   Start the development server:
   npm start

  Open your browser and navigate to http://localhost:3000.

 4. Building for Production
  Build the application:
  npm run build 
  The production build will be available in the build directory.

#### Folder Structure
- src/: Contains all source files.
- components/: React components.
- redux/: Redux-related files including slices, actions, and reducers.
- api/: API interaction logic (e.g., simulateApiCall).
- styles/: Custom styles.
- App.js: Main application component.
- main.js: Entry point for the React application.

### Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

