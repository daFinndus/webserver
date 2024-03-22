addEventListener('DOMContentLoaded', () => {
    clearFields();
    console.log('Hello from script.js');

    document.getElementById('form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const data = new FormData(this);
        console.log('Form submitted with following data:', data);

        // Send the form data to the server
        await fetch('/upload', {
            method: 'POST',
            body: data,
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                alert('Data uploaded successfully');
                return response.text();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                alert('Error uploading data')
                console.error('Error:', error);
            });

        // Clear the fields after the form has been submitted
        clearFields();
    });
});

// Function for clearing the necessary fields
clearFields = () => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    console.log('Fields cleared');
}