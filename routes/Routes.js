const express = require('express');
const Joueur = require('../models/Joueur');
const Partie = require('../models/Partie');
const router = express.Router();
module.exports = function(io) 

{router.post("/newJoueur",async (req,res)=>{
    console.log(req.body)
    const joueur = new Joueur({
        pseudo: req.body.pseudo,
    });
    joueur.save()
    console.log(joueur)
    res.send("salam")
})
router.get("/getAll",async (req,res)=>{
    try
{const joueurs = await Joueur.find()
res.send(joueurs)}
catch(e){
    res.send(e)
}
})
router.get("/getById/:id",async (req,res)=>{
    const id = req.params.id
    try
{const joueurs = await Joueur.findById(id)
res.send(joueurs)}
catch(e){
    res.send(e)
}
})
router.delete("/deleteById/:id",async (req,res)=>{
    const id = req.params.id
    try
{const joueurs = await Joueur.deleteOne({_id:id})
res.send("deleted")}
catch(e){
    res.send(e)
}
})
router.put("/attaque/:id1/:id2",async (req,res)=>{
    const id1 = req.params.id1
    const id2 = req.params.id2
    try
    {
        const joueur1 = await Joueur.findById(id1)
        const joueur2 = await Joueur.findById(id2)
        joueur2.sante = joueur2.sante - 20
        joueur1.score = joueur1.score + 10
        joueur1.save()
        joueur2.save()
        res.send("attaque")
    }
    catch(e){
        res.send(e)
    }
})
router.post("/partie",async (req,res)=>{
    console.log(req.body)
    const partie = new Partie({
        nom: req.body.nom,
        joueur_1: req.body.joueur_1,
        joueur_2: req.body.joueur_2,
    });
    partie.save()
    io.emit("partie",partie)
})

return router;

}