# Description
This project is a real-time chat application built with a NestJS backend and a Next.js frontend, including Tailwindcss. It utilizes GraphQL subscriptions for live message updates and MongoDB for data persistence, and also mongodb configured in from docker for this development purpose. The app features user authentication, multiple chat rooms, and a responsive UI for seamless communication.


# Questions
- What are the pros and const of having both server and client in one repo but in separate folrers server/ and client/ ? 
considering the purpose of this challenge, I will allocate the entire project in one repository, considering that for large and scalable architectures this is not a good practice, it can become dificult to build separate processes for both client and server, also, it can become challenging to handle colaborative versioning.

- How to test with different users the gql subscription ?
Open multiple tabs to simulate different users and observe real-time updates across tabs, thanks to sessionstorage.

# Resources
- [apollo docs](https://www.apollographql.com/docs)
- [responsive design tailwindcss](https://tailwindcss.com/docs/responsive-design)
- [nest + graphql](https://docs.nestjs.com/graphql/quick-start)
- [next docs](https://nextjs.org/docs)
- [apollo wrapper config](https://www.youtube.com/watch?v=nhvmCldV0HU)

# ...

# Getting Started

## Server Setup

1. Navigate to the server folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure db is running:
   ```bash
   docker compose up -d # detached   
   ```

4. Start the server:
   ```bash
   npm run start:dev
   ```

The server will run on `http://localhost:3000` by default.

## Client Setup

1. Navigate to the client folder:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The client will be available at `http://localhost:3001`.

# Architecture Overview

This project follows a client-server architecture with GraphQL as the communication layer.

### Server
> Backend follows a modular architecture, using also [Adapter Design Pattern](https://refactoring.guru/design-patterns/adapter) to handle plugins.
- Built with Node.js and Express
- Uses Apollo Server for GraphQL implementation
- Implements subscriptions for real-time updates
- Manages chat rooms and messages

#### Server Dependencies
- [env-var](https://www.npmjs.com/package/env-var): Verification, sanitization, and type coercion for environment variables 

### Client
- Built with Next.js (React framework)
- Uses Apollo Client for GraphQL queries, mutations, and subscriptions
- Implements a responsive UI for chat functionality
- Utilizes client-side state management with React hooks

#### Server Dependencies
- [@apollo/experimental-nextjs-app-support](https://www.npmjs.com/package/@apollo/experimental-nextjs-app-support) provide support to issues in nextjs using apollo wrapper.

The server exposes a GraphQL API that the client consumes. Real-time updates are achieved through GraphQL subscriptions, allowing for instant message updates across multiple clients.

# Vscode extension recommended
- [apollo-graphql](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo)