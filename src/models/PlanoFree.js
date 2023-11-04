import mongoose from "mongoose";

//ATENÇÃO
//PRECISAMOS PUXA O NAME,AVATAR, REDESSOCIAIS, CONTATOS, ENDERECO DE PESSOAJURIDICA
//PARA PREENCHER OS COMPONENTES NAME_PJ, AVATAR_PJ, REDESSOCIAIS_PJ, CONTATOS_PJ, ENDERECO_PJ

const CarrosselSchema = new mongoose.Schema({
  img1: {
    type: String,
    required: false,
  },
  img2: {
    type: String,
    required: false,
  },
  img3: {
    type: String,
    required: false,
  },
  img4: {
    type: String,
    required: false,
  },
  img5: {
    type: String,
    required: false,
  },
});

const FuncionamentolSchema = new mongoose.Schema({
    dia: {
      type: String,
      required: false,
    },
    Hora: {
      type: String,
      required: false,
    },
    Feriado: {
      type: String,
      required: false,
    },
  });

const PlanoFreeSchema = new mongoose.Schema({
  likes: {
    type: Array,
    require: true,
  },
  carrossel: CarrosselSchema,
  funcionamento: FuncionamentolSchema,
});

const PlanoFree = mongoose.model("PlanoFree", PlanoFreeSchema);

export default PlanoFree;

