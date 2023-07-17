const express = require("express");
const router = express.Router();

const Libro = require('../models/Libro');

// Ruta para obtener todos los libros
router.get("/", async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los libros' });
    }
});

// Ruta para obtener un libro por ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const libro = await Libro.findById(req.params.id)
        res.json(libro);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el libro' });
    }
});

// Ruta para crear un nuevo libro
router.post("/", async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el libro' });
    }
});

// Ruta para actualizar un libro existente
router.put("/:id", async (req, res) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(libro);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
});

// Ruta para eliminar un libro
router.delete('/:id', async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el libro' });
    }
});

module.exports = router;
