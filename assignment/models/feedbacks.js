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

    const sqlQuery = `SELECT * FROM Feedbacks`; 

    const request = connection.request();
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset.map(
      (row) => new Feedback(row.id, row.rating, row.comments)
    ); // Convert rows to feedback objects
  }

  static async getFeedbackById(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Feedbacks WHERE id = @id`; 

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

  static async createFeedback(newFeedbackData) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `INSERT INTO Feedbacks (rating, comments) VALUES (@rating, @comments); SELECT SCOPE_IDENTITY() AS id;`; // Retrieve ID of inserted record

    const request = connection.request();
    request.input("rating", newFeedbackData.rating);
    request.input("comments", newFeedbackData.comments);

    const result = await request.query(sqlQuery);

    connection.close();

    // Retrieve the newly created book using its ID
    return this.getFeedbackById(result.recordset[0].id);
  }

  static async updateFeedback(id, newFeedbackData) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `UPDATE Feedbacks SET rating = @rating, comments = @comments WHERE id = @id`; // Parameterized query

    const request = connection.request();
    request.input("id", id);
    request.input("rating", newFeedbackData.rating || null); // Handle optional fields
    request.input("comments", newFeedbackData.comments || null);

    await request.query(sqlQuery);

    connection.close();

    return this.getFeedbackById(id); // returning the updated book data
  }

  static async deleteFeedback(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `DELETE FROM Feedbacks WHERE id = @id`; // Parameterized query

    const request = connection.request();
    request.input("id", id);
    const result = await request.query(sqlQuery);

    connection.close();

    return result.rowsAffected > 0; // Indicate success based on affected rows
  }
}

module.exports = Feedback;

