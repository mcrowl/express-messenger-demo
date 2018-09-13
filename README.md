# express-messenger-demo

## Overview
This is an example app that allows two users to send messages back and forth. It uses the Socket.IO library and largely follows the examples provided with that library.

## Design decisions
* The Socket.IO library was chosen because it provided most of the needed functionality in one library, and had good documentation.
* Storage was not added in this app to save time in completing the assignment.  Instead it uses the server provided by socket.io.  Data is not persisted in this version.
* Bunyan logging was added to standardize logging format to json.
* A default route of / is provided and auto-assigns (randomly) a username to each user.  (This does have a flaw in that random usernames can overlap...but I did not implement code to avoid collisions to save time on the assignment.)
* The chat app currently has no real user identification / security and any user can use any name they want by using the /chat/:user route.
* Only one unit test was provided - enough to show unit test style, isolating / mocking functions, etc, but not full coverage of a file.

## Libraries / Stack
### App libraries used:
* Express.js
* Socket.IO
* Bunyan
### Testing / build tools used
* eslint - linting / checking js files for format and errors
* gulp - task runner (only one example task was implemented for this app)
* mocha - test runner
* sinon - mocking / spies / fakes for functions
* chai - assertion library
* rewire - monkey-patching library to isolate functions / objects for unit testing
* nodemon - monitor changes to files during development and reload the app


## Running the app

* `npm run-script build` - installs node libraries (also cleans up node_modules from previous build prior to downloading libs)
* `npm run-script start` - starts the app running
* `npm run-script nodemon app/server.js localhost 8888` - starts nodemon, which starts the app
* `npm run-script lint` - runs eslint
* `npm run-sript test test/unit/app/main.js` - runs the provided unit test


## Interacting the the app

* `http://localhost:3000/`, the user will be assigned a random username, and then redirected to the chat app to join.
* `http://localhost:3000/status`, provides a simple status endpoint for the app to verify it is up.
* `http://localhost:3000/chat/:user`, starts the chat app for the user, a socket is opened via the socket.IO library and all users connected to this endpoint receive a message saying the new user has joined.  Messages sent via the send button are echoed to all connected users.

To see chat between multiple users, open multiple tabs to `http://localhost:3000/`, then just send messages from each window.


# Improving the design / Scaling the application

* Persisting messages: The app could be backed by a database to persist message history and provide a way to echo back recent messages when users join the channel.
* Scaling the app: The app could utilize a messaging platform such as Amazon's SNS which would allow clients to publish / subscribe messages.  This would allow the chat app servers to be more stateless, as any chat app server could subscribe and pass messages onto a client.  Users attempting to communicate with eachother would not need to be hosted on the same app server.
* Metrics, logging, and analysis: These functions could largely be performed via subscribing automated systems to the same message stream so the work of analyzing content, providing metrics, and some logging functions could be offloaded from the application servers.


