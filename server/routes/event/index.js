import Model from './model';
import util from '../../util/';
import authenticate from '../../middlewares/authenticate';
import defineCriteria from './defineCriteria';

const publicFieldsCriteria = { password: 0 };
const express = require('express');

const router = express.Router();

// GET
router.get('/:_id*?', (req, res) => {
  const criteria = defineCriteria(req);

  Model.find(criteria, publicFieldsCriteria)
  .then((docs) => { res.json(docs); })
  .catch(err => res.status(500).json(err));
});

// POST
router.post('/', (req, res) => {
  const model = new Model(req.body);

  model.save()
  .then(doc => res.json(doc))
  .catch((errors) => {
    res.status(500).json(errors);
  });
});

// PUT
router.put('/:_id*?', (req, res) => {
  const _id = req.params._id || req.body._id;
  const model = util.lowerizeFields(req.body, 'desc');
  Model.findOneAndUpdate({ _id }, model)
  .then(doc => res.json(doc))
  .catch(errors => res.status(500).json(errors));
});

// DELETE
router.delete('/:_id*?', (req, res) => {
  const _id = req.params._id || req.body._id;
  Model.findByIdAndRemove(_id)
  .then(() => res.status(200).json({}))
  .catch(err => res.status(500).json(err));
});


module.exports = router;
