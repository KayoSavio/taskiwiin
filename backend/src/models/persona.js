const mongoose = require('mongoose');

const PersonaSchema = new mongoose.Schema({
  emotional:{
    type: Number,
  },
  spiritual:{
    type: Number,
  },
  relatives:{
    type: Number,
  },
  conjugal:{
    type: Number,
  },
  children:{
    type: Number,
  },
  social:{
    type: Number,
  },
  health:{
    type: Number,
  },
  serve:{
    type: Number,
  },
  intelectual:{
    type: Number,
  },
  financial:{
    type: Number,
  },
  professional:{
    type: Number,
  }
});

const Persona = mongoose.model('Persona', PersonaSchema);

module.exports = Persona;