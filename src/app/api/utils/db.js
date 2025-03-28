import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // Conexão já foi estabelecida
  }

  const uri = process.env.MONGODB_URI; // Adicione sua URI no arquivo .env
  const dbName = process.env.MONGODB_DB;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName,
    });
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error);
    throw new Error('Erro ao conectar ao banco de dados');
  }
};

export default connectToDatabase;