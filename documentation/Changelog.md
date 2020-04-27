# ChangeLog: The checklist and record of everything done so far... coming soon to a Trello Board Near You!

## Phase I - Initial Setup:

1. Set up React, create the App component, get it to talk to the server, and console log the hello message to est. the connection.

2. Do some DB tests with insomnia first to establish that we've got a good grasp on how the data structure works and how to interact with it a bit: Post a test user id to the tests collection.

3. Make a test endpoint in the server that queries the database and finds that test user!

4. Make a button on the FE that retrieves that user id and console.logs it.

5. Use state to display the retrieved info on the page itself, then split some wood.

6. Consider next steps, now that the initial pipeline is established.

7. Make skeleton login page for phone format.

8. On submit, send name and pw to server and await reply, which will be console logged!

9. Setup that endpoint and echo the req.body

10. Create function on BE that looks up the employee in the (test) database and checks that the ID matches the PW. Then send an OK message to the FE!

11. Create router endpoints in the App for employee and manager main pages

12. Create skeleton main pages for employee and manager (literally just 'hello worker' and 'hello parasite')

13. Create the ACTUAL database for the projects (so long test collection) and add one employee who is a manager, and one who isn't.

14. When the FE receives a confirmation message from the server, write a function that brings you to the home page for the employee in question.

15. Add redux state so the FE can 'remember' who is logged in right now (and use that to render your name on your page).

16. Basic security: Use Redux state to conditionally render the manager's page ONLY IF the current user has admin status!

17. Basic privacy: Also use Redux state to make it so an employee's page can only be visited by that employee!

18. Layout managers's UI (for desktop only right now) on paper/in paint, then with React (again, bare bones only, no cosmetics).

19. Render Manager's main page UI.

20. Add components list to Trello FE to-do's list

21. Add buttons to LHS sidebar on manager's page:

### 22. Setup routes for other admin pages to link to above-mentioned buttons

### 23. Create skeleton pages for other admin pages and test them out.

### 24. Make the Schedule display component!

## Checkpoint - Version 0.0.1: Whatever is done on Sunday night goes to GH as V.0.1.0... Let's make it good!
