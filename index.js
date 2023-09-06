require('dotenv').config();
const express = require("express")
const cors = require("cors");
// node-fetch v3 is an ESM-only module, you are not able to import it with a normal require().
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const sqlite3 = require('sqlite3').verbose();
const port = process.env.address
const address = process.env.API_URL
const api = `${process.env.NASA_API}?api_key=${process.env.API_KEY}`

//file
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const app = express()
app.use(cors())
//db connection
let db = new sqlite3.Database('./database/db.sqlite', (err) => {
    if (err) {
        console.error(err.message)
    }
});

/**
 * This route will download the the APOD of this day and store it
 * into the database.
 */
app.post("/download/today", async (req, res) => {
    let apiResponse = null
    let apiResult = null

    const fetchError = {
        "status": "failed",
        "information": "The server was not able to fetch the api."
    }
    const reachError = {
        "status": "failed",
        "information": "The api was not reachable."
    }

    try {
        apiResponse = await fetch(api)
    } catch (error) {
        res.status(400).json(fetchError)
        console.error(fetchError)
        return
    }

    if (!apiResponse.ok) {
        res.status(400).json(reachError)
        console.error(reachError)
        return
    }

    // Now the request should be fine
    apiResult = await apiResponse.json()

    // Download image and store information in database
    // TODO: downloadImage still has to be implemented (function head is already below)
    const image = await downloadImage(apiResult.url)
    if (image === null) {
        return
    }

    db.run(`INSERT INTO images (title, description, date, path) 
            VALUES(?, ?, strftime('%Y-%m-%d', ?), ?);`,
        [apiResult.title, apiResult.explanation, apiResult.date, image]
    )
    res.status(200).json({
        "status": "success",
        "information": {
            "message": "The Nasa Image of the day, is successfully added into the database.",
            // TODO: edit the placeholder to the real path/url, where you can find the image in the api
            "url": path.join(__dirname, 'dowloads', image)
        }
    })
})

/**
 * This function will download an image from the submitted url and will safe it in the directory
 * you can provide as second optional argument.
 *
 * @param {string} url A String value, which contains the url of the image you want to store.
 * @param {string} directory An optional String value, which contains the directory, where the
 *  images should be stored. When not specified, it will be downloads.
 * @returns A String or null. It will be null, when something went wrong. Otherwise the string will
 *   contain the path of the image.
 */
async function downloadImage(url, directory = 'downloads') {
    try {
        if(url.includes('youtube')){
            return url
        }
        const response = await fetch(url);
        const fileName = path.basename(url);
        const filePath = path.join(directory, fileName);
        if (fs.existsSync(filePath)) {
            return filePath
        }
        const imageBuffer = await response.buffer();
        await writeFileAsync(filePath, imageBuffer);
        return filePath;
    } catch (error) {
        console.error('Error downloading image:', error);
        return null;
    }
}

app.get("/photos", (req, res) => {
    // Get page number and page size from query parameters (default values if not provided)
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page

    // Calculate the offset based on the page number and page size
    const offset = (page - 1) * pageSize;
    const query = `SELECT *, COUNT(*) OVER() AS totalItems FROM images ORDER BY date LIMIT ? OFFSET ?`

    const params = [pageSize, offset];
    db.all(query, params, (err, rows) => {
        try {
            db.all(query, params, (err, rows) => {
                const totalItems = rows[0]?.totalItems || 0 // Get the total count from the first row
                // Remove the 'totalItems' property from each row
                rows.forEach(row => delete row.totalItems);
                res.status(200).json({
                    "status": "success",
                    "data": rows,
                    "totalItems": totalItems
                });
            });
        } catch (error) {
            console.error("Error querying the database:", error);
            res.status(500).json({
                "status": "failed",
                "information": "Failed to retrieve data from the database."
            });
        }

    });
});



app.listen(port, () => console.log(`Server is listening on ${address}:${port}`))

