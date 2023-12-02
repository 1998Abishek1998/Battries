# THE BATTRIES

This project is a list of batteries, each containing: name, postcode, and watt capacity. 
This data is persisted in Mongo. And UI is created using react, antd tailwind css.

Server is created using node js and express. The API has an endpoint that receives a 
postcode range along with filter and search. The response body contains a list of 
batteries sorted alphabetically. Additionally, there is some statistics included for 
the returned batteries, such as: total and average watt capacity.

## Table of Contents

- [Installation]

  Note -> Please install latest version of node js to run the code smoothly.
  
  ### For Client 
  
    1) Create new file ".env" and Add the following

      #### VITE_API_URL="http://localhost:8000"

    2) cd Client
    
    3) npm install
    
    4) npm run start:dev

  ### For Server

    1) Create new file ".env" and add the following:

        #### NODE_ENV="development"
        #### PORT="8000"
        #### DATABASE_URL="your mongodb url"

    2) cd Server
    
    3) npm install
    
    4) npm run start:dev
