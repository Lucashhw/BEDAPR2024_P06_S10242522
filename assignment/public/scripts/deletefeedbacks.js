async function deleteFeedbackById(feedbackId) {
    try {
        const response = await fetch(`/feedbacks/${feedbackId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            alert(`Feedback with ID ${feedbackId} deleted successfully.`);
            document.getElementById("delete-feedback-form").reset(); 
        } else {
            alert(`Failed to delete feedback with ID ${feedbackId}. Please make sure the ID is correct.`);
        }
    } catch (error) {
        console.error(`Error deleting feedback with ID ${feedbackId}:`, error);
        alert(`An error occurred. Please try again.`);
    }
}
