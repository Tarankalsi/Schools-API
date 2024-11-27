import express, { Request, Response } from "express";
import { pool } from "../db";
import { listSchoolsSchema, schoolSchema } from "../zod";
import { calculateDistance } from "../utils/calculateDistance";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, World!');
})

router.get("/schools", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM schools");
        res.json(rows);
    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/addSchool", async (req: Request, res: Response) => {
    const body = req.body

    const { success, error } = schoolSchema.safeParse(body)

    if (!success) {
        res.status(404).json({
            message: 'Input Validation Error',
            error: error.message
        })
        return;
    }
 try {
    
    const result = await pool.query(
        "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
        [body.name, body.address, body.latitude, body.longitude]
    );

    res.status(201).json({
        message: "School added successfully",
        data: result
    });
    return
 } catch (error) {
    res.status(500).json({
        message :"Internal Server Error"
    })    
 }

})

router.get("/listSchools", async (req: Request, res: Response) => {
    const {longitude,latitude} = req.query;
    console.log(longitude,latitude)

    const { success, error } = listSchoolsSchema.safeParse({
        longitude: Number(longitude),
        latitude: Number(latitude),
      });

    if (!success) {
        res.status(404).json({
            message: 'Input Validation Error',
            error: error.message
        })
        return;
    }

    try {
        const [rows] = await pool.query("SELECT * FROM schools")

        const schools = (rows as any[]).map((school) => {
            const distance = calculateDistance(
                Number(latitude),
                Number(longitude),
                school.latitude,
                school.longitude
            );
            return { ...school, distance };
        });

        schools.sort((a, b) => a.distance - b.distance)

        res.status(200).json({
            message: "Schools listed successfully",
            totalSchools: schools.length,
            data: schools
        })
        return
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }


})

export default router;