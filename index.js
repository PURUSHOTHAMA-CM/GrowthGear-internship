import express from "express";
import bodyParser from "body-parser";

const app=express();
const port = process.env.port || 3000;  

app.use(bodyParser.urlencoded({extended:true}));

// creating a mock db;

const db={
    inventory:[{productid:1,product:"pen",price:"10"}
        ,
        {productid:2,product:"book",price:"35"}
    ]
};


// authorizing using api key

const apikey="secretkey";

app.use((req,res,next)=>{
    const token = req.header("api-key");
  if (!token || token !== apikey) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
})

// making queries from natural language

function getQuery(naturalQuery) {
    const lowerQuery = naturalQuery.toLowerCase();
  
    if (lowerQuery.includes("all") || lowerQuery.includes("*")) {
      return "SELECT * FROM inventory";
    }
  
    const productMatch = lowerQuery.match(/pen|book/);
    const priceMatch = lowerQuery.includes("price");
  
    if (productMatch && priceMatch) {
      return `SELECT price FROM inventory WHERE product='${productMatch[0]}'`;
    }
    else if(productMatch ){
        return `SELECT price FROM inventory WHERE product='${productMatch[0]}'`;
    
    }
  
    return null;  // Return null for unsupported queries
  }
  

// query endpoint

app.post("/query",(req,res)=>{

    var naturalQuery=req.body.query;


    // var realQuery=getQuery(naturalQuery);

    if(!naturalQuery)
    {
        res.status(400).json({error:"QUERY REQUIRED"});
    }
    else if(naturalQuery.toLowerCase().includes("all") || naturalQuery.includes("*"))
    {
        res.json(db);
    }
    else{
        if(naturalQuery.includes("pen"))
        {
            var response=db.inventory.find((item)=>item.product==="pen");
            var result={priceOfPen:response.price}
            res.json(result);
        }
        else if(naturalQuery.includes("book")){
            var response=db.inventory.find((item)=>item.product==="book");
            var result={priceOfBook:response.price}
            res.json(result);
        
        }
        else{
            res.status(400).json({error:"QUERY REQUIRED"});
        }
    }

});

// explination endpoint

app.post("/explain",(req,res)=>{

    var naturalQuery=req.body.query;

    if (!naturalQuery) {
        return res.status(400).json({ error: "QUERY REQUIRED" });
      }

    var realQuery=getQuery(naturalQuery);
    if(!realQuery)
    {
        res.status(400).json({error:"QUERY REQUIRED"});
    }
    else{
        res.json({explanation:realQuery});
    }

});

// validating query

app.post("/valid",(req,res)=>{
    var naturalQuery=req.body.query;

    if (!naturalQuery) {
        return res.status(400).json({ error: "QUERY REQUIRED" });
      }

    var realQuery=getQuery(naturalQuery);
    if(!realQuery)
    {
        res.json({valid:"query is not valid"});
    }
    else{
        res.json({valid:"query valid"});
    }
});


// end

app.listen(port,()=>{
    console.log(`listning to port ${port}`);
});
