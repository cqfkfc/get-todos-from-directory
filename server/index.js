const express = require("express");
const formidable = require("formidable");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

app.post("/api/upload/files", (req, res) => {
    console.log('/api/upload/files called')
    const form = formidable({multiple: true});
    form.parse(req, (err, fields, files) => {

        if (err) {
            next(err);
            return;
        }

        const promises = Object.values(files).map((file)=>{
            return new Promise((resolve, reject)=>{
                fs.readFile(file.path, 
                    function(error, data) {
                        if (error) throw error;
                        if (data.includes('TODO')) {
                            resolve(file.name)
                        }
                        else {
                            resolve()
                        }
                        resolve(file.name,data.includes('TODO'))
                        
                    }
                )
            })
        })

        Promise.all(promises).then((data)=>res.send({data: data.filter(item=>item!=undefined)}))
    })

  });


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});