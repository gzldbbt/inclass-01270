//NODEJS


//Declare the libraries

const express = require("express"); //minimalist framework
const mysql = require("mysql2/promise"); //mysql database library

const app = express();
const port = 3000;

const dbConfig = {
    host:"localhost",
    user:"-in-class-user",
    password:"123456",
    database:"in-class-d",
    port:3306
}

app.use(express.json());

//HRRP VERBS: POST, GET, PUT, PATCH, OPTIONS
//first endpoint
//GET
app.get("/",(req,res) => {
    res.status(200).json({message: "API isrunning"});
})
//POST
app.post("/message",async(req,res) =>{
    const{name, email, message} = req.body;

    if(!name ||!email ||!message)
        return res.status(400).json({error: "All fields are required"});

    try{
            const conn = await mysql.createConnection(dbConfig);

            const query = "INSERT INTO users(name, email, password) VALUES (?, ?,?)";
            await conn.execute(query,[name, email, message]);
            await conn.end;
                
            res.status(201).json({message: "Created sucessfully"});
    }catch(e){
        res.status(500).json({error: 'Something happens in your server: ${e}'});
    }
});
//GET, list the messages; we can use the sam route because they are different protocols
app.get("/message",async() => {
    try{
        const conn = await mysql.createConnection(dbConfig);

        const [rows] = await conn.execute("SELECT * FROM messages");
        await conn.end();
        res.status(200).json(rows);//[{name, email, messages}]
    }catch(e){
        res.status(500).json({error: `Fail: ${e}`});
    }

    
})
async function initDatabase() {
    try{
        const conn = await mysql.createConnection(dbConfig);
        const [tables] = await conn.query("SHOW TABLES like 'messages'");//an objec(..., tables:[ ... ])
        if(tables.length == 0){
            const createTableQuery=`
                            CREATE TABLE IF NOT EXISTS messages (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(200) NOT NULL,
                            email VARCHAR(200) NOT NULL,
                            message TEXT NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
            await conn.query(createTableQuery);
            console.log("Table created");
                            
        }
        else{
            console.log("Table already created");
        }
        await conn.end();
    }catch(e){
        console.error(`Database error: ${e}`);
        process.exit(1);
    }
}


initDatabase().then(() =>{
    app.listen(port,() =>{
    console.log('The server is running, PORT: ${port}');

});
})
