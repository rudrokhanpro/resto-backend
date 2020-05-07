const mongoose = require("mongoose");

const CLIENTS_COLLECTION_NAME = "clients";

// Client Scheme
const clientsSchema = new mongoose.Schema(
  {
    lastname: {
      type: String,
      uppercase: true,
      required: true,
    },
    firstname: String,
    address: String,
    zip: String,
    city: {
      type: String,
      uppercase: true,
    },
    phone_numbers: [String],
    comments: String,
    isRed: Boolean,
  },
  {
    timestamps: true,
  },
);

// Methods
/** 
 * Get a client by his ObjectId
 * @param {string} _id - Client unique ID 
 * @returns {object} MongoDB Document
*/
clientsSchema.statics.findOneById = function (_id) {
  return this.findOne({ _id });
};

/**
 * Get a list of clients with the corresponding lastname
 * @param {string} lastname - Client's lastname
 * @returns {Array<object>} Array of MongoDB Documents
*/
clientsSchema.statics.findByLastname = function (lastname) {
  return this.find({ lastname: new RegExp(lastname, "i") });
};

/**
 * Get a list of clients with the corresponding phone number
 * @param {string} phone_number - Client's phone number
 * @returns {Array<object>} Array of MongoDB Documents
*/
clientsSchema.statics.findByPhoneNumber = function (phone_number) {
  return this.find({ phone_numbers: new RegExp(phone_number, "i") });
};

// Client Model
const Clients = new mongoose.model(
  "Clients",
  clientsSchema,
  CLIENTS_COLLECTION_NAME,
);

module.exports = Clients;