const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Feedback {
  constructor(id, rating, comments) {
    this.id = id;
    this.rating = rating;
    this.comments = comments;
  }

  static async getAllFeedbacks() {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Feedbacks`; // Replace with your actual table name

    const request = connection.request();
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset.map(
      (row) => new Feedback(row.id, row.rating, row.comments)
    ); // Convert rows to feedback objects
  }

  static async getFeedbackById(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Feedbacks WHERE id = @id`; // Parameterized query

    const request = connection.request();
    request.input("id", id);
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset[0]
      ? new Feedback(
          result.recordset[0].id,
          result.recordset[0].rating,
          result.recordset[0].comments
        )
      : null; // Handle feedback not found
  }
}

module.exports = Feedback;