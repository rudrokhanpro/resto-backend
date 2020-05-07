const clientRouter = require("express").Router();
const STATUS = require("../utils/status_codes");

// Mongodb models
const Clients = require("../models/Clients");

/* ------------------------------- ALL CLIENTS ------------------------------ */

clientRouter
  .route("/")
  .get(async (req, res) => {
  const clients = await Clients.find();

  res.status(STATUS.OK).json({
    clients,
  });
});

/* --------------------------------- SEARCH --------------------------------- */

clientRouter
  .route("/search/lastname/:lastname")
  .get(async (req, res) => {
    const clients = await Clients.findByLastname(req.params.lastname || "");

    res.status(STATUS.OK).json({
      clients,
    });
  });

clientRouter
  .route("/search/phone_number/:phone_number")
  .get(async (req, res) => {
    const clients = await Clients.findByPhoneNumber(req.params.phone_number);

    res.status(STATUS.OK).json({
      clients,
    });
  });

/* ------------------------------ CLIENT BY ID ------------------------------ */

/**
 * Middleware that finds a client by his ObjectId.
 * If found, the client informations is set on the request.
 * Otherwise, sends back a NOT FOUND status.
 */
async function getClientById(req, res, next) {
  const client = await Clients.findOneById(req.params._id);

  if (client === null) 
    res
      .status(STATUS.NOT_FOUND)
      .json({ client });
  else {
    req.client = client;
    next();
  }
}

clientRouter
  .route("/id/:id")

  // GET
  .get(getClientById, async (req, res) => {
    res.status(STATUS.OK).json({
      client: req.client,
    });
  })

  // DELETE
  .delete(getClientById, async (req, res) => {
    const client = req.client;

    await client.delete();

    res.status(STATUS.OK).json({
      _id: client._id,
      deleted: true,
    });
  });

/* ------------------------------- NEW CLIENT ------------------------------- */

clientRouter
  .route("/new")
  .post(async (req, res) => {
    const client = new Clients(req.body);

    try {
      await client.save();

      res.status(STATUS.SUCCESS).json({
        client,
      });
    } catch (error) {
      console.log(error);
      res.json({
        error: error.name,
        message: error.message,
        client: null,
      });
    }
  });

module.exports = clientRouter;
