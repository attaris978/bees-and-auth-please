# bees-and-auth-please
React | React-Redux | Node | Express | Knex | SQLite | React-Router
<h2>Overview</h2>
This project began as part of a <b>Bloom Institute of Technology</b> <i>Full-Stack Web Development</i> program which aimed to test competency with React-Redux, amongst many other concepts. The visual layout for the Wheel component is derived from that project. I reworked the logic and wrote a backend to add a secondary widget, accessible through a React-Router NavLink.
<h2>Spinning It Up</h2>
The backend can be run by navigating to the <b>back</b> folder and running <i>npm run server</i>.
The frontend can be run by navigating to the <b>front</b> folder and running <i>npm run dev</i>
<h2>All the Persnickety, Complicated Details of Use and Operation</h2>
Access each widget using the NavLinks toward the top of the page.
The Login component requires a username and password to login (which may have presented itself as a likelihood to you). Presently, registration is not enabled, so try logging in using the master account:
<p><b>username:</b> overlord</p><b>password:</b> 1234</p>
Successful login triggers the conditionally-rendered appearance of a collection of articles and a means of inputting articles, editing them, and removing them. It also causes a logout button to render.
Access to the articles is managed using authentication via jsonwebtokens, created through the backend.
Authentication and article data is stored using knex and SQLite.
<h2> Next to Come ... </h2>
1) Create a new-user registration page
2) Connect the login/articles widget to the Redux store (using redux-thunk to handle asynchronous DB api requests)
3) Take advantage of the "roles" table in the database to set a separate, "admin-only" section, perhaps listing user information if the logged-in user is an admin. This could be managed using express-sessions to allow for confirmed removal of access when a user logs out.
