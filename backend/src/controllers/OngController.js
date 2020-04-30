const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  },

  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    // Gerando um id
    const id = generateUniqueId();
  
    // Inserindo os dados na tabela Ongs
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })
  
    return res.json({ id });
  } 
}