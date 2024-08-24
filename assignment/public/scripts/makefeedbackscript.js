async function makeFeedbacks() {
    const response = await fetch("/feedbacks"); // Replace with your API endpoint
    const data = await response.json();
  
    const feedbackList = document.getElementById("feedback-form");
  
    const form = document.createElement("form");
    form.addEventListener("submit", submitFeedback);
  
    const ratingLabel = document.createElement("label");
    ratingLabel.textContent = "Rating: ";
    const ratingInput = document.createElement("input");
    ratingInput.type = "number";
    ratingInput.name = "rating";
    ratingInput.required = true;
    ratingLabel.appendChild(ratingInput);
  
    const commentsLabel = document.createElement("label");
    commentsLabel.textContent = "Comments: ";
    const commentsInput = document.createElement("textarea");
    commentsInput.name = "comments";
    commentsInput.required = true;
    commentsLabel.appendChild(commentsInput);
  
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";
  
    form.appendChild(ratingLabel);
    form.appendChild(commentsLabel);
    form.appendChild(submitButton);
  
    feedbackList.appendChild(form);
  
    async function submitFeedback(event) {
      event.preventDefault();
  
      const formData = new FormData(form);
      const feedback = {
        rating: formData.get("rating"),
        comments: formData.get("comments")
      };
  
      const response = await fetch("/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(feedback)
      });
  
      if (response.ok) {
        
        alert("Feedback submitted successfully");
        form.reset(); 
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    }
}
makeFeedbacks(); // Call the function to create the feedback form
    
    
  