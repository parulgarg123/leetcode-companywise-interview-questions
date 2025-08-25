const fs = require("fs");
const path = require("path");

const rootDir = "."; // repo root
const output = {};

fs.readdirSync(rootDir).forEach((company) => {
  // skip hidden/system files and non-directories
  if (company.startsWith(".") || company === "docs" || company === "node_modules") return;
  const companyPath = path.join(rootDir, company);
  if (fs.lstatSync(companyPath).isDirectory()) {
    output[company] = [];
    fs.readdirSync(companyPath).forEach((file) => {
      if (file.endsWith(".md")) {
        const filePath = path.join(companyPath, file);
        const content = fs.readFileSync(filePath, "utf-8");
        output[company].push({
          file,
          content,
        });
      }
    });
  }
});

fs.writeFileSync("questions.json", JSON.stringify(output, null, 2));
console.log("Generated questions.json!");