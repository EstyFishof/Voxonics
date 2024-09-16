const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
//Adding an agent's call summary to the file
app.post('/save-data', (req, res) => {
    const { id, firstName, lastName, phoneNumber, status, comment } = req.body;
    
    const newData = { id, firstName, lastName, phoneNumber, status, comment };

    fs.readFile('output.json', 'utf8', (err, data) => {
        let jsonData = [];
        
        if (!err && data) {
            try {
                jsonData = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
            }
        }

        jsonData.push(newData);

        fs.writeFile('output.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                res.status(500).send('Error saving data');
            } else {
                console.log('Data saved to output.json');
                res.status(200).send('Data saved successfully');
            }
        });
    });
});
//Getting all call summaries of the agent
app.get('/load-data', (req, res) => {
    fs.readFile('output.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            try {
                const jsonData = JSON.parse(data);
                res.json(jsonData);
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                res.status(500).send('Error parsing JSON data');
            }
        }
    });
});
//Deleting agent's call summary
app.delete('/delete-row/:id', (req, res) => {
    const idToDelete = req.params.id.trim(); 

    fs.readFile('output.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }

        let jsonData = [];
        try {
            jsonData = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            return res.status(500).send('Error parsing JSON data');
        }

        console.log('Type of ID to delete:', typeof idToDelete);
        jsonData.forEach(entry => {
            console.log('Type of entry ID:', typeof entry.id);
        });

        const idToDeleteNumber = Number(idToDelete);

        const updatedData = jsonData.filter(entry => Number(entry.id) !== idToDeleteNumber);

        console.log('Data after filter:', JSON.stringify(updatedData, null, 2));

        fs.writeFile('output.json', JSON.stringify(updatedData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).send('Error deleting row');
            }
            console.log('Row deleted successfully and file updated');
            res.status(200).send('Row deleted successfully');
        });
    });
});

  
//update the comment of the agent's summary call
app.put('/update-comment', (req, res) => {
    const updatedEntry = req.body;

    fs.readFile('output.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }

        let jsonData = [];
        try {
            jsonData = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            return res.status(500).send('Error parsing JSON data');
        }

        const entryIndex = jsonData.findIndex(entry => entry.id === updatedEntry.id);
        if (entryIndex !== -1) {
            jsonData[entryIndex].comment = updatedEntry.comment;
        }

        fs.writeFile('output.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).send('Error updating comment');
            }
            console.log('Comment updated successfully');
            res.status(200).send('Comment updated successfully');
        });
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
