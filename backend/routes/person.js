import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/popular", async (req, res) => {
    try {
        const baseUrl = "https://api.themoviedb.org/3/person/popular";
        
        const queryParams = new URLSearchParams(req.query).toString();
        const url = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.API_TOKEN}`
            }
        };

        const response = await fetch(url, options);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
