const mysql = require('mysql2/promise');

//mysql promise ORM which allows users to add data and get data using a connection pool.

module.exports = {
    db: "agromation_growRoom",

    //Get Connections takes a DB name string and a password.
    //run this commend before running the other commands in this controller.
    // remember to end() the connection object after your done using it
    GetConnection: async function (db = this.db, pass = "password") {
        try {
            return await mysql.createConnection({
                host: "localhost",

                // Your port; if not 3306
                port: 3306,

                // Your username
                user: "root",

                // Your password
                password: pass,
                database: db
            });
        } catch (err) {
            throw err;
        }

    },

    selectAllFromTable: async function (con, table) {
        let queryString = "SELECT * FROM ?"
        try {
            let response = await con.query(queryString, table);
            return new Promise((resolve, reject) => {
                if (response) {
                    resolve(response[0]);
                } else {
                    reject({err: "MYSQL SERVER ERROR Code:500 in SelectAllFromTable()"})
                }
            })
        } catch (err) {
            throw err;
        }
    },

    selectWhere: async function (con, tableInput, colToSearch, valOfCol) {
        let queryString = "SELECT * FROM ?? WHERE ?? = ?";
        try {
            let response = await con.query(queryString, [tableInput, colToSearch, valOfCol]);
            return new Promise((resolve, reject) => {
                if (response) {
                    resolve(response[0]);
                } else {
                    reject({err: "SQL Sever error code:500 in method selectWhere()"})
                }
            });
        } catch (err) {
            throw err;
        }
    },

    selectUserIdFromEmail: async function (con, selector, tableInput, colToSearch, valOfCol) {
        let queryString = `SELECT id FROM users WHERE email ="${valOfCol}"`;
        try {
            let response = await con.query(queryString, [selector, tableInput, colToSearch, valOfCol]);
            return new Promise((resolve, reject) => {
                if (response) {
                    resolve(response[0]);
                } else {
                    reject({err: "SQL Sever error code:500 in method selectWhere()"})
                }
            });
        } catch (err) {
            throw err;
        }
    },

    selectSomethingWhere: async function (con, selector, tableInput, colToSearch, valOfCol) {
        let queryString = "SELECT ? FROM ?? WHERE ?? = ?";
        try {
            let response = await con.query(queryString, [selector, tableInput, colToSearch, valOfCol]);
            return new Promise((resolve, reject) => {
                if (response) {
                    resolve(response[0]);
                } else {
                    reject({err: "SQL Sever error code:500 in method selectWhere()"})
                }
            });
        } catch (err) {
            throw err;
        }
    },

    selectAndOrder: async function (con, whatToSelect, table, orderCol) {
        let queryString = "SELECT ?? FROM ?? ORDER BY ?? DESC";
        console.log(queryString);
        try {
            let response = await con.query(queryString, [whatToSelect, table, orderCol]);
            return new Promise((resolve, reject) => {
                if (response) {
                    resolve(response[0]);
                } else {
                    reject({err: "SQL server response error code:500 in method SelectAndOrder()"})
                }
            });
        } catch (err) {
            throw err;
        }
    },

    selectGrowRoomDataForIDInDesc: async function (con, growRoomID, orderCol) {
        let queryString = `SELECT * FROM growRoomData WHERE growroomID = ${growRoomID} ORDER BY ?? DESC`;
        return new Promise(async (resolve, reject) => {
            try {
                let response = await con.query(queryString, [orderCol]);
                if (response) {
                    resolve(response);
                } else {
                    reject({err: "SQL server response error code:500 in method selectGrowRoomDataForIDInDesc()"})
                }
            } catch (err) {
                reject(err);
            }
        });
    },

    findWhoHasMost: async function (con, tableOneCol, tableTwoForeignKey, tableOne, tableTwo) {
        let queryString =
            "SELECT ??, COUNT(??) AS count FROM ?? LEFT JOIN ?? ON ??.??= ??.id GROUP BY ?? ORDER BY count DESC LIMIT 1";
        try {
            let response = await con.query(
                queryString,
                [tableOneCol, tableOneCol, tableOne, tableTwo, tableTwo, tableTwoForeignKey, tableOne, tableOneCol]);
            return new Promise((resolve, reject) => {
                if (response) {
                    resolve(response[0]);
                } else {
                    reject({err: "SQL server Response Error code:500 in method findWhoHasMost()"});
                }
            });

        } catch (err) {
            throw err;
        }
    },
// inserts new users into the database
    insertNewUser: async function (con, tableOneCol, InsertObject) {
        let queryString =
            `INSERT INTO ${tableOneCol} SET ?;`;
        try {
            console.log(InsertObject)
            let response = await con.query(
                queryString, {
                    fullName: InsertObject.fullName,
                    email: InsertObject.email,
                    password: InsertObject.password,
                    createdOn: InsertObject.createdOn
                });
            return new Promise((resolve, reject) => {
                if (response) {
                    resolve(response[0]);
                } else {
                    reject({err: "SQL server Response Error code:500 in method InsertNewUser()"});
                }
            });
        } catch (err) {
            console.log("error inserting data to table");
            throw err;
        }
    },
    // inserts new GrowRoom into the database //table ref is the serial number
    insertNewGrowRoom: async function (con, InsertObject) {
        let queryString =
            `INSERT INTO growRooms SET ?;`;
        return new Promise(async (resolve, reject) => {
            try {
                let response = await con.query(
                    queryString, {
                        growroomName:InsertObject.growroomName,
                        location: InsertObject.location,
                        ownerID: InsertObject.ownerID,
                        serial: InsertObject.serial,
                        setPoint: InsertObject.setPoint
                    });
                if (response) {
                    console.log(response[0].insertId);
                    resolve({id: response[0].insertId, msg: "success"});
                } else {
                    reject("SQL ERROR 500 no response in Insert new Grow room");
                }
            } catch (e) {
                reject(e);
            }
        })
    },


    // used to update GrowRoom with their start and stop times.
    updateGrowRoomTime: async function (con, InsertObject, growRoomID) {
        let queryString = `UPDATE growRooms
        SET ?
        WHERE id = ${growRoomID};`
        return new Promise((resolve, reject) => {
            try {
                if (InsertObject.running) {
                    //if there is no firstStartTime Start Grow room for first time
                    if (InsertObject.firstStartTime != undefined) {
                        let res = con.query(queryString, {
                            firstStartTime: InsertObject.firstStartTime,
                            lastStartTime: InsertObject.lastStartTime,
                            totalRunTime: InsertObject.totalRunTime,
                            statusMsg: InsertObject.statusMsg
                        });
                        resolve(res);
                    } else {
                        let res = con.query(queryString, {
                            lastStartTime: InsertObject.lastStartTime,
                            totalRunTime: InsertObject.totalRunTime,
                            statusMsg: InsertObject.statusMsg
                        });
                        resolve(res);
                    }
                    //if the Grow room is not running anymore shut it off
                } else {
                    let res = con.query(queryString, {
                        running:InsertObject.running,
                        totalRunTime: InsertObject.totalRunTime,
                        statusMsg: InsertObject.statusMsg
                    });
                    resolve(res);
                }

            } catch (e) {
                console.log(e);
                reject(e)
            }
        })
    },

    // inserts new GrowRoom data into the database //table ref is the serial number
    insertGrowRoomData: async function (con, InsertObject) {
        let queryString =
            `INSERT INTO growRoomData SET ?;`;
        return new Promise(async (resolve, reject) => {
            try {
                let response = await con.query(
                    queryString, {
                        growroomID: InsertObject.growroomID,
                        temp1: InsertObject.temp1,
                        temp2: InsertObject.temp2,
                        temp3: InsertObject.temp3,
                        ambientTemp: InsertObject.ambientTemp,
                        humidity: InsertObject.humidity,
                        timestamp: InsertObject.timestamp
                    });
                if (response) {
                    console.log(response[0].insertId);
                    resolve({id: response[0].insertId, msg: "success inserted data"});
                } else {
                    reject("SQL ERROR 500 in Inserting Grow room data");
                }
            } catch (e) {
                reject(e);
            }
        })
    }
//end of methods
}
