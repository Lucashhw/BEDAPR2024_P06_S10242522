async function fetchFeedbacks() {
    const response = await fetch("/feedbacks"); // Replace with your API endpoint
    const data = await response.json();
  
    const feedbackList = document.getElementById("feedback-list");
  
    data.forEach((feedback) => {
      const feedbackItem = document.createElement("div");
      feedbackItem.classList.add("feedback"); // Add a CSS class for styling
  
      // Create elements for title, author, etc. and populate with book data
      const idElement = document.createElement("h2");
      idElement.textContent = feedback.id;
  
      const ratingElement = document.createElement("p");
      ratingElement.textContent = `rating: ${feedback.rating}`;

      const commentsElement = document.createElement("p");
      commentsElement.textContent = `comments: ${feedback.comments}`;
  
      // ... add more elements for other book data (optional)
  
      feedbackItem.appendChild(idElement);
      feedbackItem.appendChild(ratingElement);
      feedbackItem.appendChild(commentsElement);
      // ... append other elements
  
      feedbackList.appendChild(feedbackItem);
    });
  }
  
  fetchFeedbacks(); // Call the function to fetch and display book data