addEventListener('DOMContentLoaded', () => {
    clearFields();
    console.log('Hello from script.js');

    document.getElementById('form').addEventListener('submit', async function (event) {
        event.preventDefault();

        if (!checkAge()) return;

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value,
        };

        // Send the form data to the server
        await fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
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

// Function for checking if the age is valid
checkAge = () => {
    const age = document.getElementById('age').value;
    if (18 <= age && age <= 120 && Number.isInteger(Number(age))) {
        console.log('Age is valid');
        return true;
    } else {
        console.log('Age is invalid');
        alert('Age should be an integer between 18 and 120');
        return false;
    }
}

// Function for clearing the necessary fields
clearFields = () => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('age').value = '';
    console.log('Fields cleared');
}