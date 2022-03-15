const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  let data = await Tag.findAll({
    include: [Product]
  });

  data = data.map((e) => e.toJSON());

  res.json(data);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  let data = await Tag.findByPk(req.params.id,{
    include: [Product]
  });

  data = data.toJSON();

  res.json(data);
});

router.post('/', (req, res) => {
  // create a new tag

  Tag.create({
    tag_name: req.body.tag_name
  })

  res.json({message:"New Tag Added"});
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  });

  res.json({message:"Tag Updated"});
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  Tag.destroy({
    where: {
      id: req.params.id
    }
  });

  res.json({message:"Tag Deleted"});
});

module.exports = router;
