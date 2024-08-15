const express = require('express');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const app = express();

// Create the folder where the files will be saved
const folderPath = path.join(__dirname, 'generated_files');
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}

// API endpoint to create a text file
app.get('/create-file', (req, res) => {
    // Get the current date and time for the filename
    const dateTime = moment().format('YYYYMMDD_HHmmss');
    const fileName = `${dateTime}.txt`;
    const filePath = path.join(folderPath, fileName);

    // Get the current timestamp for the content
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

    // Write the timestamp to the file
    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            return res.status(500).send('Error creating file');
        }
        res.send(`File created: ${fileName}`);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
