#BackendRoutes Documentation.

# http://localhost:3001/api/r/addroom

POST - Will create a new Grow room in the DB
        Requires appropriate headers
        
*  key: "authorization": Fill in authorization token from redux
*  key: "roomName" : string name of grow room
*  key: "serial": The rooms Serial String to identify it.
*  key: "location": single string location of the Grow room

Will return an object with an id: key and a msg: key

# http://localhost:3001/api/r/getgrowrooms

POST - will return an array of grow rooms for a particular user id

headers:

* key: "authorization": your authorization token
* key: "location":location catagory of rooms ----NOT IMPLEMENTED YET

will return an array of Grow rooms from the db


# http://localhost:3001/api/r/recent

POST - will return an array of recent data for that particular grow room ID

headers:

* key: "authorization": your auth token.
* key: "roomID": the grow room id number or the index of the grow room in the db
