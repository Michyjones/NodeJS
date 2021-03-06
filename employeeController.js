function AllEmployees(req, res) {
  const { knex } = req.app.locals;
  knex
    .select('name', 'email', 'salary', 'department')
    .from('employess')
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
}

function SingleEmployees(req, res) {
  const { knex } = req.app.locals;
  const { id } = req.params;
  knex
    .select('name', 'email', 'salary', 'department')
    .from('employess')
    .where({ id: `${id}` })
    .then(data => {
      if (data.length > 0) {
        return res.status(200).json(data[0]);
      } else {
        return res.status(404).json(`No Employee with  ID ${id} !!`);
      }
    })
    .catch(error => res.status(500).json(error));
}

function CreateEmployees(req, res) {
  const { knex } = req.app.locals;
  const payload = req.body;
  requiredColumns = ['name', 'email', 'salary', 'department'];
  payloadKeys = Object.keys(payload);
  requiredColumnsExists = requiredColumns.every(rc => payloadKeys.includes(rc));
  if (requiredColumnsExists) {
    knex('employess')
      .insert(payload)
      .then(response => res.status(200).json('Employee created successfully'))
      .catch(error => res.status(500).json(error));
  } else {
    return res
      .status(400)
      .json(`Fill in the required fields ${requiredColumns}`);
  }
}

function UpdateEmployees(req, res) {
  const { knex } = req.app.locals;
  const { id } = req.params;
  const payload = req.body;
  knex('employess')
    .where('id', id)
    .update(payload)
    .then(response => {
      if (response) {
        return res
          .status(200)
          .json(`You have successfully updated employee with ID ${id}`);
      }
      return res.status(404).json(`No employee with ID ${id}`);
    })

    .catch(error => res.status(500).json(error));
}

function DeleteEmployees(req, res) {
  const { knex } = req.app.locals;
  const { id } = req.params;
  knex('employess')
    .where('id', id)
    .del()
    .then(response => {
      if (response) {
        return res
          .status(200)
          .json(`You have successfully deleted employee with ID ${id}`);
      }
      return res.status(404).json(`No employee with ID ${id}`);
    })
    .catch(error => res.status(500).json(error));
}

module.exports = {
  AllEmployees,
  SingleEmployees,
  CreateEmployees,
  UpdateEmployees,
  DeleteEmployees
};
