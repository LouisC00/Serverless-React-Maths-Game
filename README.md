# Real-Time Typing Game

A competitive, real-time typing game built with React and serverless architecture. Players can join a game, type randomly generated words, and compete for the highest score. The game features serverless functions for managing game sessions and high scores, JWT authentication for secure user identification, and a responsive design for an engaging user experience.

## Key Features

- **Real-Time Gameplay:** Players can join ongoing games and compete in real-time to type words as quickly as possible.
- **High Score Leaderboard:** Players can view the leaderboard to see how they rank against others, with high scores stored and managed using serverless functions and Airtable.
- **Authentication:** Secure user authentication is provided by Auth0, ensuring that only registered players can access the game and save their scores.
- **Responsive Design:** The game is styled using styled-components, providing a consistent and enjoyable experience across various devices.

## Tech Stack

- **Frontend:** React, styled-components
- **Backend:** Netlify Functions, Airtable
- **Authentication:** Auth0

## Project Overview

In this project, I've developed a real-time typing game using React for the frontend and serverless architecture for the backend. The game challenges players to type words as quickly as possible, with their scores being saved and displayed on a global leaderboard. By leveraging serverless functions hosted on Netlify, the game can handle multiple concurrent players without the need for a traditional server setup. Additionally, the integration of Auth0 for authentication ensures that players' scores are securely associated with their accounts.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real-time-typing-game.git
   ```
2. Navigate to the project directory:

   ```bash
   cd real-time-typing-game
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

### Deployment

This project is deployed on Netlify. To deploy your own instance, follow these steps:

1. Push your code to a GitHub repository.
2. Connect your GitHub repository to Netlify.
3. Set up build commands and publish directory in Netlify.
4. Deploy your site.

### Contributing

Contributions are welcome! If you have any ideas or improvements, feel free to fork the repository and submit a pull request.

License

This project is licensed under the MIT License
