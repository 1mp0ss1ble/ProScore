import Model from './model';
import util from '../../util/';
import authenticate from '../../middlewares/authenticate';
import defineCriteria from './defineCriteria';

const express = require('express');

const router = express.Router();
const publicFieldsCriteria = { password: 0 };

// GET
router.get('/:_id*?', (req, res) => {
  const criteria = defineCriteria(req);

  Model.find(criteria, publicFieldsCriteria)
  .then((docs) => { res.json(docs); })
  .catch(err => res.status(500).json(err));
});

// POST
router.post('/', authenticate('admin'), (req, res) => {
  const model = new Model(req.body);

  model.save()
  .then(doc => res.json(util.removeProps(doc, 'password')))
  .catch(err => res.status(500).json(err));
});

// PUT
router.put('/:_id*?', authenticate('admin'), (req, res) => {
  const _id = req.params._id || req.body._id;

  const model = util.lowerizeFields(req.body, 'username');
  Model.findOneAndUpdate({ _id }, model)
  .then(doc => res.json(doc))
  .catch(err => res.status(500).json(err));
});

// DELETE
router.delete('/:_id*?', authenticate('admin'), (req, res) => {
  const _id = req.params._id || req.body._id;

  Model.findByIdAndRemove(_id)
  .then(() => res.status(200).json({}))
  .catch(err => res.status(500).json(err));
});

module.exports = router;
