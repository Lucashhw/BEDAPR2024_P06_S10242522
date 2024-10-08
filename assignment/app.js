const express = require("express");
const feedbacksController = require("./controllers/feedbacksController");
const sql = require("mssql"); // Assuming you've installed mssql
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser"); // Import body-parser
const validateFeedback = require("./middlewares/validateFeedback");

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port
const staticMiddleware = express.static("public"); // Path to the public folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

app.use(staticMiddleware); // Mount the static middleware

app.get("/feedbacks", feedbacksController.getAllFeedbacks);
app.get("/feedbacks/:id", feedbacksController.getFeedbackById);
app.post("/feedbacks", validateFeedback, feedbacksController.createFeedback);
//app.put("/feedbacks/:id", feedbacksController.updateFeedback); 
app.delete("/feedbacks/:id", feedbacksController.deleteFeedback); 
app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  // Perform cleanup tasks (e.g., close database connections)
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});



