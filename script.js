addEventListener('DOMContentLoaded', () => {
    console.log('Hello from script.js');

    document.getElementById('submit').addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // If the input is not empty, send a response to the server
        if (name && email) {
            fetch('https://localhost:3000/upload?name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email))
                .then(response => response.text())
                .then(message => {
                    console.log('Response from server:', message);
                    alert(message);

                    // Clear the input fields
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                })
                .catch(error => {
                    console.error('Error fetching url:', error);
                    alert('Error while fetching URL');
                });
        } else {
            alert('Please fill out all fields');
        }
    });
});