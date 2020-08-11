const sql = require('../controllers/mysql2ORMController');

// TODO write tests
let main = async function(){
    try{
        let con = await sql.GetConnection();
        
        console.log("insert function finished");
        console.log(insert);
        return insert;
    }catch(e){
        console.log(e)
        return e;
    }

};

main();
