import express, { Request, Response } from "express";
import { Form } from "../models/Form";

interface Params {
    id: string;
}

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
    try {
        const forms = await Form.find().select("title");
        res.json(forms);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error retrieving forms", error: error.message });
        } else {
            res.status(500).json({ message: "Error retrieving forms", error: "Unknown error" });
        }
    }
});

router.get("/:id", async (req: Request<Params>, res: Response) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ message: "Form not found" });
        res.json(form);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error retrieving form", error: error.message });
        } else {
            res.status(500).json({ message: "Error retrieving form", error: "Unknown error" });
        }
    }
});

router.post("/", async (req: Request, res: Response) => {
    const { title, fields } = req.body;
    if (!title || !fields || !Array.isArray(fields) || fields.length === 0) {
        return res.status(400).json({ message: "Title and fields are required" });
    }
    try {
        const form = new Form({ title, fields });
        await form.save();
        res.status(201).json(form);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error creating form", error: error.message });
        } else {
            res.status(500).json({ message: "Error creating form", error: "Unknown error" });
        }
    }
});

router.put("/:id", async (req: Request<Params>, res: Response) => {
    const { title, fields } = req.body;
    if (!title || !fields || !Array.isArray(fields) || fields.length === 0) {
        return res.status(400).json({ message: "Title and fields are required" });
    }
    try {
        const form = await Form.findByIdAndUpdate(
            req.params.id,
            { title, fields },
            { new: true }
        );
        if (!form) return res.status(404).json({ message: "Form not found" });
        res.json(form);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error updating form", error: error.message });
        } else {
            res.status(500).json({ message: "Error updating form", error: "Unknown error" });
        }
    }
});

router.delete("/:id", async (req: Request<Params>, res: Response) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) return res.status(404).json({ message: "Form not found" });
        res.status(204).send();
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error deleting form", error: error.message });
        } else {
            res.status(500).json({ message: "Error deleting form", error: "Unknown error" });
        }
    }
});

export default router;
