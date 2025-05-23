import express from 'express'
import * as db from './util/database.js'

const app = express();
app.use(express.json());
const PORT = 8080;

app.get('/recipes', (req, res) =>{
    try{
        const recipes = db.getRecipes();
        res.status(200).json(recipes);
    }catch(err){
        res.status(500).json({message: `${err}`})
    }
})

app.get('/recipes/:id', (req, res) =>{
    try{
        const recipe = db.getRecipe(req.params.body);
        if(!recipe){
            return res.status(404).json({message: 'Recipe not found!'})
        }
        res.status(200).json(recipe);
    }catch(err){
        res.status(500).json({message: `${err}`})
    }
})

app.post('/recipes', (req, res) =>{
    try{
        const {title, content} = req.body;
        if(!title || !content){
            return res.status(400).json({message: 'Invalid credentials!'});
        }
        const savedRecipe = db.saveRecipe(title, content);
        if(savedRecipe.changes != 1){
            return res.status(501).json({message: 'Save failed!'})
        }
        res.status(201).json({id: savedRecipe.lastInsertRowid, title, content})
    }catch(err){
        res.status(500).json({message: `${err}`})
    }
})

app.put('/recipes/:id', (req, res) =>{
    try{
        const {title, content} = req.body;
        if(!title || !content){
            return res.status(400).json({message: 'Invalid credentials!'});
        }
        const id = +req.params.id;
        if(updateRecipe.changes != 1){
            return res.status(501).json({message: "Update failed!"})
        }
        res.status(201).json({id: updateRecipe.lastInsertRowid, title, content})
    }catch(err){
        res.status(500).json({message: `${err}`})
    }
})

app.delete('/recipes/:id', (req, res) =>{
    try{
        const deleteRecipe = db.deleteRecipe(req.params.id);
        if(deleteRecipe.changes != 1){
            return res.status(501).json({message: "Delete failed!"})
        }
        res.status(201).json({message: "Delete successful!"})
    }catch(err){
        res.status(500).json({message: `${err}`})
    } 
})

app.listen(PORT, () => {console.log(`Server runs on ${PORT}`)});