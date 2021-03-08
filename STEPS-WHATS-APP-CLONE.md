# Steps for Reproduction

## Step 1: Creating a basic React APP with a basic view

1. Create project:

```sh
yarn create react-app whatsapp-clone-client --template typescript
yarn add prettier
yarn start

```

1. `index.html`: Rename title.
1. `manifest.json`: Rename app
1. Create`.prettierignore`.
1. Create `.prettierrc.yml`.
1. Run

    ```sh
    yarn format
    ```

## First screen

1. Create `components/ChatsList.tsx`: Add mock contents.
1. Create `components/ChatsNavbar.tsx`.
1. Create `components/ChatsListScreen/index.tsx`.
1. `App.tsx`: Replace contents `ChatsList`.
1. Add date library:

    ```sh
    yarn add moment
    ```

## Step 2: Styling with Material UI and styled-components

1. `src/index.tsx`: Setup theme.
1. `src/index.css`: Add background and text color variables.
1. `ChatsNavbar.tsx`: Replace `div` with `toolbar`.
1. Add Material UI dependencies:

    ```sh
    yarn add @material-ui/core @material-ui/icons
    yarn add styled-components @types/styled-components
    ```

## Step 3: Setup a basic Node.JS server with a basic REST endpoint

1. Create project

    ```sh
    mkdir whatsapp-clone-server
    cd whatsapp-clone-server
    yarn init -yp
    ```

1. Create `index.js`: Add `console.log`.

1. `package.json`: Add start script.

1. Add typescript:

    ```sh
    yarn add --dev typescript ts-node @types/node
    mv index.js index.ts
    ```

1. Create `tsconfig.json`:
1. Test

    ```sh
    yarn start
    ```

1. Add Express:

    ```sh
    yarn add express
    yarn add --dev @types/express
    ```

1. `index.ts`: Add Express server with `/_ping` route.
1. Add Prettier:

   ```sh
   yarn add --dev prettier
   ```

1. Add `chats` route.
1. Test

    ```sh
    yarn start
    curl localhost:4000/chats 
    ```

1. Add CORS:

    ```sh
    yarn add cors
    yarn add --dev @types/cors
    ```

1. `index.ts`: Add CORS.

1. Create `.env`: Add `REACT_APP_SERVER_URL`.

1. `ChatsList.tsx`: Fetch chats from API: Add `useState` and `useMemo` to fetch.
1. Delete `src/db.ts`.
1. Test:

    ```sh
    # 1. terminal whatsapp-clone-server
    yarn start
    # 2. terminal whatsapp-clone-client
    yarn start
    ```

## Step 4: Transition to GraphQL

1. Create `schema/typeDefs.graphql` in the server.

1. Install

    ```sh
    yarn add apollo-server-express graphql
    yarn add --dev @types/graphql
    ```

1. `index.ts`: Add `ApolloServer({schema})`. Add `/graphql` path.

1. Create `schema/resolvers.ts`. Add `Query` and `Chats`.
1. Add custom scalars ready-to-use:

    ```sh
    yarn add graphql-scalars
    yarn add graphql-tools graphql-import
    ```

1. Create `schema/index.ts`: Add GraphQL schema.

1. Test with `curl`:

   ```sh
   yarn start
   curl -X POST  -H "Content-Type: application/json" \
    --data '{ "query": "{ chats { id name picture lastMessage { id content createdAt } } }" }' \
    localhost:4000/graphql
   ```

1. Test in the browser:

    ```graphql
    query {
        chats {
            id
            name
            picture
            lastMessage {
            id
            content
            createdAt
            }
        }
    }
    ```

1. `ChatList.tsx`: Replace rest call with graphql call.

## Step 5: Testing

1. `App.test.tsx`: Render `<App />` at `div`.
1. Test

    ```sh
    yarn test
    ```

1. `ChatList.tsx`: Add `data-testid` for every component.
1. Install test packages:

    ```sh
    yarn add jest-fetch-mock @testing-library/jest-dom @testing-library/react
    ```

1. `ChatsList.test.tsx`: Create `customGlobal.fetchMock`.

1. Create `ChatList.test.tsx`: Mock a fetch, check fields with `getByTestId`.

### Server Setup

1. Install packages:

    ```sh
    yarn add --dev jest @types/jest ts-jest
    yarn add --dev apollo-server-testing
    yarn add --dev jest-junit
    ```

1. `package.json`: Add `"jest"` config.
1. Create `tests/queries/getChats.test.ts`.
1. Test

    ```sh
    yarn test
    ```

## Step 6: Creating an app router and implementing a chat room

### Client

1. Add router dependencies:

    ```sh
    yarn add react-router-dom @types/react-router-dom
    ```

1. `App.tsx`: Add routes for `/chats`: `ChatsListScreen`, `/chats/:chatId`: `ChatRoomScreen`, `/`: `redirectToChats`.

### Add Server messages

1. `schema/resolvers.ts`: Add `messages(chat: any)`.
1. `db.ts`: Add `messages`, remove `lastMessage`.
1. `schema/typeDefs.graphql`: Add `messages`.. Add `chat`.
1. `tests/queries/getChat.test.ts`: Add `Query.chat` test.
1. `tsconfig.json`: Problem: "An async function or method must return a 'Promise'. Make sure you have a declaration for 'Promise' or include 'ES2015' in your `--lib` option." Solution: (<https://stackoverflow.com/questions/43555378/ts-an-async-function-or-method-in-es5-es3-requires-the-promise-constructor>) Add:

    ```json
      "lib": [ "es2015" ]
    ```

### Add Client chat room screens

1. Create `ChatRoomScreen/index.tsx`: Fetch `chat`.
1. Test

    ```sh
    # 1. terminal whatsapp-clone-client
    yarn start
    # 2. terminal whatsapp-clone-server
    yarn start
    # test http://localhost:3000/chats/1
    ```

1. Install history dependency:

    ```sh
    yarn add history @types/history 
    yarn add react-router-transition
    ```

1. `ChatsList.tsx`: Add `useCallback` and `History`. Add `navToChat` which navigates to chat at `onClick`.
1. `ChatsListScreen/index.tsx`: Add `history` prop to `ChatsList`.
1. `ChatsListScreen/ChatsList.test.tsx`: Add `/` route test. Add click on `chat` test
1. `react-app-env.d.ts`: Add `react-router-transition`.
1. Create `AnimatedSwitch.tsx`: Add `MyAnimatedSwitch`.
1. Create `public/assets`: Add [chat-background](https://raw.githubusercontent.com/Urigo/WhatsApp-Clone-Client-Angular/master/src/assets/chat-background.jpg) and [message-mine](https://raw.githubusercontent.com/Urigo/WhatsApp-Clone-Client-Angular/master/src/assets/message-mine.png).
1. Create `ChatRoomScreen/ChatNavbar.tsx`: Add `ChatNavbar` component.
1. Create `ChatRoomScreen/MessageList.tsx` and `ChatRoomScreen/MessageInput.tsx`.
1. `ChatRoomScreen/index.tsx`: Use `ChatNavbar` instead of `div`s.
1. `App.tsx`: Add history.
1. `MessageInput.tsx`: Add buttons.
1. `ChatRoomScreen/index.tsx`: Add `onSendMessage`.
1. Test

    ```sh
    # 1. terminal whatsapp-clone-client
    yarn start
    # 2. terminal whatsapp-clone-server
    yarn start
    # test http://localhost:3000/chats/1
    ```

1. `ChatRoomScreen/MessagesList.tsx`: If a message was send, set scroller down.
1. Create `ChatRoomScreen/ChatNavbar.test.tsx`:
1. `ChatNavbar.tsx`: Add test ids to `BackButton`.
1. Create `MessageInput.test.tsx`:
1. Problems:
   1. `TypeError: isMocking is not a function or its return value is not iterable`
   1. `SyntaxError: Cannot use import statement outside a module` (`react-router-transition`):

    ```sh
    "transformIgnorePatterns": [
      "node_modules/(?!(react-router-transition)/)"
    ],
    "resetMocks": false
    ```

    1. `ChatsList › should navigate to the target chat room on chat item click`:

    ```txt
    Expected: "/chats/1"
    Received: undefined
    ```

## Step 7: Caching with Apollo-Client

1. Install

    ```sh
    yarn add apollo-client apollo-cache-inmemory apollo-link apollo-link-http
    yarn add @apollo/react-hooks graphql-tag graphql
    ```

1. Create `client.ts`:
1. `index.tsx`: Add `ApolloProvider`.
1. `ChatRoomScreen/index.tsx`: Use `useApolloClient` and `useQuery`. Use `__typename` as a cache key.
1. Install apollo mock:

    ```sh
    yarn add --dev apollo-link-mock
    ```

1. Create `src/test-helpers.ts`. Add `mockApolloClient` function. Problem: `Type 'MockLink' is missing the following properties from type 'ApolloLink': onError, setOnError`. Solution [Issue 213](https://github.com/jaydenseric/apollo-upload-client/issues/213):

   ```typescript
   link: new MockLink(mocks) as any
   ```

1. Problem: `Type 'ApolloClient<NormalizedCacheObject>' is not assignable to type 'ApolloClient<any>'`:

    ```typescript
    <ApolloProvider client={client}>
    ```

    Solution: Replace

    ```typescript
    import { InMemoryCache } from 'apollo-cache-inmemory';
    import { ApolloClient } from 'apollo-client';
    ```

    by

    ```typescript
    import { ApolloClient, InMemoryCache } from '@apollo/client';
    ```

1. `App.test.tsx`: Add test: render `App` inside `ApolloProvider` without crashing. Problem:

    ```typescript
      const client = mockApolloClient();
    /*
        Expected 1 arguments, but got 0.ts(2554)
        test-helpers.ts(4, 34): An argument for 'mocks' was not provided.
    */
    ```

    Solution: Insert null

    ```typescript
      const client = mockApolloClient(null);
    ```

## Step 8: Sending messages with GraphQL mutations

1. Server: `schema/typeDefs.graphql`: Add `Mutation` with `addMessage`.
1. `db.ts`: Add types `Chat`,`Message`. Add `resetDb`.
1. `mutations/addMessage.test.ts`: Add add message test.
1. `ChatRoomScreen/index.tsx`: Add `addMessage` and `update`.
1. Test: Navigate from ChatsListScreen to ChatRoomScreen, send a message, and then go back, you'll see that the last message was not updated.

### Update `ChatsRoomScreen`

1. Create `src/graphql/queries/chats.query.ts`: Add `query Chats`.
1. Create `src/graphql/queries/index.ts`: Export `chats.query.ts`.
1. `components/ChatRoomScreen/index.tsx`: Add export.
1. `ChatRoomScreen/index.tsx`: Add `client.readQuery` after `update`.
1. `ChatsList.tsx`: Remove `getChatsQuery`, use `queries.chats` instead.
1. `ChatListScreen/ChatsList.test.tsx`:Replace `getChatsQuery` with `queries.chats`.

### Use GraphQL fragments

1. Create Fragments: `graphql/fragments/`: `chat.fragments.ts`, `index.ts`, `message.fragments.ts`
1. `ChatRoomScreen/index.tsx`:
1. Problem at `http://localhost:3000/chats/1`:

   ```log
   Unhandled Rejection (Error): can't define array index property past the end of an array with non-writable length
   ```

## Step 9: Type safety with GraphQL Code Generator

### Install code generator for the server

1. Install code generator in the server project

    ```sh
    yarn add @graphql-codegen/cli --dev
    yarn add @graphql-codegen/typescript @graphql-codegen/typescript-resolvers --dev

    ```

1. `package.json`: Add:

    ```json
    "prestart": "yarn codegen",
    "codegen": "graphql-codegen",
    ```

1. Create `codegen.yml`: It generates `./types/graphql.d.ts`.
1. `.gitignore`: Add `types/graphql.d.ts`.
1. `schema/index.ts`:  Add `IResolvers`. Remove `any`.

### Install code generator for the client

1. Install

    ```sh
    yarn add @graphql-codegen/cli --dev
    yarn add @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/add
    yarn add -D @graphql-codegen/add
    ```

1. `package.json`: Add

    ```json
    "codegen": "graphql-codegen"
    ```

1. Create `codegen.yml`. Add `content` after `add:`.
1. `.gitignore`: Add `src/graphql/types.tsx`.
1. `ChatNavbar.tsx`: Instead of `ChatQueryResult` use `chat?: ...`.
1. `MessagesList.tsx`: Create interface `Message`. Remove `ChatQueryMessage`.
1. `ChatsListScreen/ChatsList.tsx`: Replace `useQuery<any>(queries.chats)` by `useChatsQuery()`.

1.  
