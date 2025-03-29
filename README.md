**Tech Stack**

Language: JavaScript (Node.js)
Framework: Express.js
Database: Mock in-memory storage
API Testing: Postman


**Installation and Setup** 

  1. Clone the Repository

      >> git clone https://github.com/PURUSHOTHAMA-CM/GrowthGear-internship.git
      >> cd GrowthGear

  2. Install Dependencies

       >> npm install express body-parser

  3. Run the Server
       >> node index.js

The server will start on http://localhost:3000.

**in package.json**
  after main add 
    "type":"module"
    

**Mock database structure**

    const db={
    inventory:[{productid:1,product:"pen",price:"10"},
        {productid:2,product:"book",price:"35"}
    ]};

**API Endpoints**

  ** Authentication**
    All endpoints require an API key for authentication.
    Include the following header in Postman requests:
      **api-key: secretkey**
      

  **Endpoints Overview**

 ** METHOD**        ** ENDPOINT**       ** DESCRIPTION**
     POST              /query        	    Executes the natural language query
     POST              /explain           Returns the pseudo-SQL equivalent
     POST              /valid             Validates the query feasibility


**Testing with Postman**

1. Query Endpoint
   
     URL: http://localhost:3000/query
     Method: POST
     Headers:
             api-key: secretkey
             Content-Type: application/x-www-form-urlencoded
     Body (x-www-form-urlencoded):
             query = price of pen
     Response:
             {"priceOfPen": "10"}

2. Explain Endpoint
   
     URL: http://localhost:3000/explain
     Method: POST
     Headers:
             api-key: secretkey
             Content-Type: application/x-www-form-urlencoded
     Body (x-www-form-urlencoded):
             query = price of pen
     Response:
             {"explanation": "SELECT price FROM inventory WHERE product='pen'"}

3. Validate Endpoint
   
     URL: http://localhost:3000/valid
     Method: POST
     Headers:
             api-key: secretkey
             Content-Type: application/x-www-form-urlencoded
     Body (x-www-form-urlencoded):
             query = price of book
     Response:
             {"valid": "query valid"}
     

**Error Handling**

  If no query is provided:
                    {"error": "QUERY REQUIRED"}

  If invalid authentication key:
                    {"error": "Unauthorized"}

  If the query is invalid:
                    {"valid": "query is not valid"}
                    
