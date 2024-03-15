console.log('Hello from script.js');

document.getElementById('button').addEventListener('click', () => {
    const dbName = document.getElementById('input').value;
    fetch('http://localhost:3000/upload?dbName=' + encodeURIComponent(dbName))
        .then(response => response.text())
        .then(message => {
            alert(message);
        })
        .catch(error => {
            console.error('Error uploading entry:', error);
            alert('Error uploading entry.');
        });
});