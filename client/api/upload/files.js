const formidable = require("formidable");
const fs = require("fs");

module.exports = async (req, res) => {
  const form = formidable({ multiple: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return;
    }

    const promises = Object.values(files).map((file) => {
      return new Promise((resolve, reject) => {
        fs.readFile(file.path, function (error, data) {
          if (error) throw error;
          if (data.includes("TODO")) {
            resolve(file.name);
          } else {
            resolve();
          }
          resolve(file.name, data.includes("TODO"));
        });
      });
    });

    Promise.all(promises).then((data) =>
      res.send({ data: data.filter((item) => item !== undefined) })
    );
  });
};
