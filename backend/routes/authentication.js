import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/authenticate", async (req, res) => {
    try {
        const url = "https://api.themoviedb.org/3/authentication";
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
