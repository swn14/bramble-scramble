const express = require("express");
const app = express();

app.use(express.json()); // Middleware for JSON body parsing

// Load all endpoints dynamically
require("./endpoints")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
