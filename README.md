# User Listing - Project

### Main use of this Repo

This Project is a Simple ReactJS Project which demonstrates the following
1. Creating a Container and Component in React
2. Making mock API calls with mirageJs
3. Sorting on the table headers and data filters
4. Persisting the states of the filter and the sort
5. React Router to navigate between components


### Live Application URL

##### https://customer-listing.netlify.app
This URL has the application deployed in

### Prerequisites  

##### Install Node JS

Refer to https://nodejs.org/en/ to install nodejs

### Running the Application in local (Development Environment)  

Clone the project into local  

Install all the npm packages. Go into the project folder and type the following command to install all npm packages  

```bash

npm install

```  

In order to run the application Type the following command  

```bash

npm start

```  

The Application Runs on **localhost:3000**  

### Running the Application in local (Production Environment)  

The static assets for the production build (minified files) has already been generated using "npm run build". To run the application in Production Environment, run the following command  

```bash

serve -s build

```  

The Application Runs on **localhost:5000**  

To change the port for the Production Build, run the following command  

```bash

serve -s build -l 8080

```

Change port 8080 with your available ports  

### Application design

#### Containers

1. **Main** Container : This Container handles the routing of the application and serves *List Container* & *List Detail Container* based on the routing

2. **List** Container : This Container contains the base layout for the */users* page and handles *Table Component* & *Filter Component*

3. **List Detail** Container : This Container contains the base layout for the */users/:id* page and handles *Profile Component*

#### Components  

1. **Table** Component : This Component displays the representative details. This Component gets its data from an API.  

2. **Profile** Component : This Component displays the particular representative profile details. This Component is the Child Component of *List Details Container*

2. **Filter** Component : This Component displays a list of filter categories and filter functions. This Component is the Child Component of *List Container*

#### API client 

**mirageJs** library is used to mock API Calls