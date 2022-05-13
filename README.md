# Data1

Deployed Project: https://data1ait.herokuapp.com/login

## Overview

Formula 1 is a motorsport where championships are won and lost based on tenths of seconds.  Data1 is a Formula 1 data aggregator which scrapes the web for all Grand Prix(gp) results and displays them graphically in a front-end site.  

Users who own the F1 video game or a similar simulation game will be able to input their times and see how they compare to the results of the professionals.  If possible, I would also like to implement a social feature where users can compare their times with other users and see side by side who has better times.




## Data Model
The application will store two types of users: professional drivers with data based in real life, and regular users who can upload their lap times for each Grand Prix of the year, and potentially other points of race data if time permits.  The data from Professional Drivers will be scraped from the official F1 website, and each user will be hard coded in, since there are only 20 drivers per year, with infrequent changes year over year.  Users however, will generate their own profiles and edit their own data.

An Example Regular User:

```javascript
{
  username: "ckovacs",
  hash: // a password hash,
  raceTimes: // an array of times, standardized to races following the same format
}
```

An Example Professional User:

```javascript
{
  name: "kimiraikkonen",
  raceTimes: // an array of times, standardized to races following the same format
  team: "Ferrari"
}
```


An Example Array of raceTimes:

```javascript
{
  user: // a reference to a User object
  raceTimes: [
    { circuit: "Monaco", year: 2018, finishedRace: true, fastestLap: "1:16.392", finishPosition: 4, currentTeam: "Ferrari"},
    { circuit: "Abu Dhabi", year: 2021, finishedRace: false, fastestLap: "1:29.698", finishedPosition: "DNF", currentTeam: "Alfa Romeo"} 
  ]
}
```


## [Initial Schema](db.js) 

This is my original schema, may be changed over time but this is the initial build.

## Wireframes
These have not been styled, just created to show the structure of the pages.

/home - page for displaying the users data in comparison to the professionals

![home](Wireframes/HomePage.pdf)

/login - page for users to log in to their accounts

![login](Wireframes/LoginPage.pdf)

/home/profile - page for displaying user info along with favorite races

![profile](Wireframes/ProfilePage.pdf)

/home/inputData - page for inputting user data to compare with pro's and friends

![input](Wireframes/InputPage.pdf)

## Site map

![Sitemap](Wireframes/Sitemap.pdf)



## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site to set up a profile
2. as a user, I can log in to the site
3. as a user, I can input my times on different tracks to compare with others
4. as a user, I can add friends to view their profiles and race history
5. as a user, I can view professional driver's times for each race
6. as a user, I can remove friends to no longer be connected with people if no longer wanted



## Research Topics

I am going to attempt for 9 points for this section out of the 8 required, in the hopes that I fulfill all 8 possible points.  I think that these added features will make my project more well rounded and presentable.

* (2 points) CSS Framework Usage
    * I am using bootstrap to style the forms and other small things within the cite.  Along with a lot of inline css for centering divs
    
* (4 points) User Authentication
    * I am using Bcrypt and Passport.Js along with GitHub OAuth to store user authentication in my MongoDB Atlas

* (3 points) 3rd Party Deployment
    * I used MongoDB Atlas, along with Heroku to deploy my application, and it should be up 24/7.






## [Link to Initial Main Project File](app.js) 

Currently commented out, but should be working.  Will update shortly


## Annotations / References Used

1. [Formula1 Data](https://www.formula1.com/en/results.html/2018/races/984/monaco/race-result.html)


