import Database  from "better-sqlite3";
const db = new Database('./data/database.sqlite');
db.prepare(`CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY, title TEXT, content TEXT)`).run();

export const getRecipes = () => db.prepare('SELECT * FROM recipes').all();
export const getRecipe = (id) => db.prepare('SELECT * FROM recipes WHERE id = ?').get(id);
export const saveRecipe = (title, content) => db.prepare('INSERT INTO recipes (title, content) VALUES (?, ?)').run(title, content);
export const updateRecipe = (id, title, content) => db.prepare('UPDATE recipes SET (title, content) WHERE id = ?').run(title, content, id);
export const deleteRecipe = (id) => db.prepare('DELETE FROM recipes WHERE id = ?').run(id);

const recipes = [
    {title: "Csokis keksz", content: "15 percig sütjük."},
    {title: "Pizza", content: "Felfuttatjuk az élesztőt."},
    {title: "Bolognai spagetti", content: "Megfőzzük a tésztát."},
    {title: "Túró rudi szelet", content: "2-3 órára hűtőbe tesszük."}
]

for(const recipe of recipes)saveRecipe(recipe.title, recipe.content);