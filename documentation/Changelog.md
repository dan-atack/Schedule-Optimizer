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

22. Setup routes for other admin pages to link to above-mentioned buttons

23. Create skeleton pages for other admin pages and test them out.

Checkpoint - Version 0.0.1: Whatever is done on Sunday night goes to GH as V.0.1.0... Let's make it good!

## Version 0.2.0:

1. Fetch and display those names - 'forget about the Redux!' ... Obvs we love redux but this isn't a job for it so let's just get the employee names and worry about local state when it's really needed.

## 2. Make the Schedule display component:

3. Clear the day names from the schedule page and remove the RHS sidebar from the main page and add separately to individual sub-pages (sidebar position/width/existence depends on which page you're visiting)

4. Make Schedule box component: mutable grid with 8 columns and variable amt of rows (default = 3 for 2 shifts plus column heads)

5. Make (or remake) RHS sidebar component with options (dummy buttons at first) for schedule making:

6. Input field for number of shifts per day (tied to the # rows in the main sched box)

7. List of employees (bonus points if you can get them in there in the first shot)

8. Employee details box - populated by info on a selected employee when their name is clicked from the list above (like adding items to the cart in the sticker workshop)

9. REDUX: Have shift number input go into state and then use that to determine the divisions in the sched box grid.

10. REDUX: Fetch the employee data and save it in state as soon as you hit the manager page to avoid async issues/conditional fetching

11. Make Schedule box day column component

12. Make shift box component to insert into day columns

13. Make role box component to subdivide shift box

14. Leftmost column (shift times) should mimic the layout of the day columns but be its own component and contain an input field to set start/end times for the shifts that they parallel

15. Add role/name input fields (one form element) to shift components

16. Make these inputs dropdown menus with the names of your workers as the options for the name category.

17. REDUX : Combine the inputs from the role/employee fields in each shift with the start/end times defined in the time selector column into one cluster of data in local memory, such that each date has a few shifts, each with a start time, end time, person and role.

18. DATABASE: Make a 'save draft' button to store data about all of the work periods (roles in a shift) for a week to the database.

19. SERVER: Make another endpoint to get this data from the FE to the DB.

20. Have a button to add more roles to a shift.

21. Ensure the DB collection objects get the date string as their IDs for easier searching later on.

22. Fetch the data for one employee's schedule (use get and req.params ) and console log it

23. DATABASE/ REDUX: When the schedule is uploaded into the DB it must have a shape that makes the employee's ID nearer to the top rather than the way it is now when the manager designs it. Run your ideas by Scott tomorrow then try implementing the 'flattened' heirarchy for the database.

24. In the meantime, experiment with the actual schedule visual display by rendering a schedule blob (new component name!) on Bob's page with some imaginary data.

### 25. Develop punchclock UI:

26. New component to isolate the punchclock module: contains In/Out buttons and an input field for employee # (req'd)

27. On initial load of the app, a new date is created in the punches collection: { '\_id': 'PUNCH-05-03-2020 }

28. Punch functions for in and out: Create new date stamp object when the punch is validated (only accept id's of current employees) then use the (truncated, dashed version of the) date as the query identifier { \_id: `PUNCH-${date} } and make another object with the rest of the punch data and insert that as the newValue for the insertOne() operation. Don't forget to wrap the whole newValue object in a { $set: {<newValue object>} }.

29. Create a skeleton display grid for viewing punches on the manager's page.

30. Viewing the punches: On manager's Punch records page fetch and display all punchclock activity in a list.

31. Highlight non-validated punches in a reddish orange and validated ones in lime green.

32. Allow manager to modify the database by reassigning punches' validation status from their screen (each LI will contain a button element to approve the punch)

### 33. Validated shifts should refresh when their status is changed... can we put the useSelector in a useEffect perhaps? doubtful, so let's consider this before proceding to the payroll question...

#### 34. Validated shifts are listed by employee name on the payroll page

#### 35. Employees have a wage associated with their names; use this plus their accumulated hours to get a pay number for each worker.

### 36. Fill out employee profile page to add a sidebar (design then implement) with buttons and pages for punch records, notifications and payroll records (use blank pages to start).

### Sunday night: Git push again and reevaluate remaining priorities.

## STRETCH ARMSTRONG:

### 1. Radio buttons for type of time display <--- Guess who just became a stretch goal!!

### 2. Can we make that shift start/end input look like a time value rather than a number??

### 3. Tighten up the look of the schedule display blob so that it's nice and flush with the hour markers on the left.

### 4. Ideal aesthetic for the 'validator' button: a red/green circle (red = not yet valid, green = valid... merge with previous column at that point?) with a tooltip when you mouseover that reads 'approve' or 'revise' depending on validation status.
