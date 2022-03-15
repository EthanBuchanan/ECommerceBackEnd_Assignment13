const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  let data = await Category.findAll({
  //});
  ///*
    include: [
      Product
    ]
  });
  //*/

  data = data.map((e) => e.toJSON());

  //console.log(data);

  res.json(data);

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  let data = await Category.findByPk(req.params.id,{
    include: [Product]
  });

  data = data.toJSON();

  res.json(data);
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })

  res.json({message:"New Catagory Added"});
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  });

  res.json({message:"Catagory Updated"});
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  });

  res.json({message:"Catagory Deleted"});
});

module.exports = router;
