# Umbrage Interview Application


## Table of Contents

- [Overview](#Overview)
  - [Screenshot](#Screenshot)
- [My Process](#My-Process)
  - [Built With](#Built-With)
  - [How It Works](#How-It-Works)
  - [Optimizations](#Optimizations)
- [Author](#Author)

## Overview

### Screenshot

![image](https://user-images.githubusercontent.com/37000585/189201543-09a50ce5-be86-4f6a-8423-5be012ac9c73.png)


## My Process

### Built With
- React
- Bulma (Styling)
- Vite (used to install React/faster server start time/updates)


### How It Works

#### Login

<ins>Upon submission of proper credentials:<ins>
  
Upon submitting the username and password, a custom authorization hook takes in the username and password, plugs it into a fetch request that returns a bearer token.
The token is then stored in local storage to allow for persistent user login and additional fetch requests using said token.
Finally, the user is routed to /avatars.

<ins>Upon submission of improper credentials:<ins>
  
A 400 Bad Request error is logged in the console because the fetch was made using improper credentials. No bearer token is stored in local storage. 
Until the user enters the correct credentials, the aforementioned result will continue to happen. 
No error message is currently displayed, but is something that should be added to notify the user of what is going on when they submit the wrong information.
  
#### Logout

When the user clicks the logout button, local storage is cleared and the user is returned to the home page (displaying the Login component).
  
#### Protected Routes
  
Until the user enters in the correct username and password and a bearer token is generated and stored in local storage, they will be unable to access /avatars and /detailedview.
The truthy/falsey value of localstorage.getItem('token') determines if the user is "authenticated" and allowed access to the protected routes (this logic is found in the ProtectedRoutes component).
  
#### Nav

A navbar is displayed only in the Avatars and DetailedView components because it contains the name of the app and a logout button. 
Since the user cannot logout before logging in and because clicking the name in the navbar takes the user to /avatars, it isn't necessary to display the navbar on the home page.
  
#### Avatars
  
After the user is authenticated, they will be routed to /avatars which in turn loads the Avatars component. 
This component makes a GET request/fetch for the data returned from the /people endpoint. The data returned from the fetch is then turned into an array and stored in a state variable.
The aforementioned array is then mapped over to create an html element containing the following information for each person in the array: avatar image (if one is available), name of the person, and a button that allows a user to see a more detailed view of the person.
Upon clicking the "Detailed View" button, the user is sent to the /detailedview route, passing along with said route the ID of the person the user wishes to see more information on.  
  
#### Detailed View

The userId sent from the Avatars component is plugged into the url made part of the fetch for data related only to the person with that userId (which is necessary to get the comments for that person).
Data for the person and the comments for the person are stored in two state variables. 
The comments are mapped over to create comment boxes and the person's avatar (if one is available, name, job title, and comments are displayed to the user.  


### Optimizations

If given more time, I would provide the following features/optimizations:
- (1) A clickable "delete" button on a person with a pop-up confirmation for deletion;
- (2) A clickable "create" button that isn't a part of the people list. Clicking this button should bring up a way to create a person;
- (3) Form validation; and
- (4) Error handling.

## Author

- Twitter - [@michaelpreyna](https://twitter.com/michaelpreyna)
- LinkedIn - [@michaelpreyna](https://www.linkedin.com/in/michaelpreyna/)
