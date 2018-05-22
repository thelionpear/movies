var express = require("express");
var router = express.Router(); 
var Movie = require("../models").Movie;




/* GET movie listings 
GET http://localhost:/3000/movies
*/
router.get("/", function(req, res) {
    Movie.all(
        {
            order: [
                ["createdAt", "ASC"]
            ]
        }
    )
        .then( function(movies) {
        res.render("movies", { movies: movies})
    })
})

/*GET /movies/someid/edit */
router.get("/:id/edit", function(req, res) {
    Movie.findById(req.params.id)
        .then( function(movie) {
            return res.render("edit", { movie: movie })
        })
})

/* PUT /movies/some id */
router.put("/:id", function(req, res) {
    Movie.update(
        { title: req.body.title },
        { where: { id: req.params.id }}
    )
    .then (function() {
        return res.redirect("/movies")
    })
})

/*POST /movies */
router.post("/", function(req, res) {
    var title = req.body.title; 
    Movie.create({ title: req.body.title })
        .then( function() {
            res.redirect("/movies")
        })
})

/*DELETE /movies/some id */
router.delete("/:id", function(req, res) {
    Movie.findById(req.params.id)
        .then( function(movie) {
            movie.destroy(); 
            return res.redirect("/movies")
        })
})

module.exports = router; 