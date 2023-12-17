import mongoose from "mongoose";

const GaleriaSchema = new mongoose.Schema({
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
  img6: {
    type: String,
    required: false,
  },
  img7: {
    type: String,
    required: false,
  },
  img8: {
    type: String,
    required: false,
  },
  img9: {
    type: String,
    required: false,
  },
  img10: {
    type: String,
    required: false,
  },
  img11: {
    type: String,
    required: false,
  },
  img12: {
    type: String,
    required: false,
  },
  img13: {
    type: String,
    required: false,
  },
  img14: {
    type: String,
    required: false,
  },
  img15: {
    type: String,
    required: false,
  },
  img16: {
    type: String,
    required: false,
  },
  img17: {
    type: String,
    required: false,
  },
  img18: {
    type: String,
    required: false,
  },
  img19: {
    type: String,
    required: false,
  },
  img20: {
    type: String,
    required: false,
  },
});

const FuncionamentoSchema = new mongoose.Schema({
  dia: {
    type: String,
    required: false,
  },
  hora: {
    type: String,
    required: false,
  },
  feriado: {
    type: String,
    required: false,
  },
});

const SocialMediaSchema = new mongoose.Schema({
  instagram: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
});

const ContatoSchema = new mongoose.Schema({
  celular: {
    type: String,
    required: false,
  },
  telefone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
});

const EnderecoSchema = new mongoose.Schema({
  endereco1: {
    type: String,
    required: false,
  },
  endereco2: {
    type: String,
    required: false,
  },
});

const PlanoFreeSchema = new mongoose.Schema({
  categoria: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },

  galeria: GaleriaSchema,

  funcionamento: FuncionamentoSchema,

  redessociais: SocialMediaSchema,

  contatos: ContatoSchema,

  endereco: EnderecoSchema,

  pessoajuridica: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PessoaJuridica",
    required: true,
  },
  // name: {
  //   type: String,
  //   required: true,
  // },
});

/*
// Adicionando um gancho (hook) para pré-salvar, que popula a propriedade "name" antes de salvar
PlanoFreeSchema.pre("save", async function (next) {
  // Populando o documento com os dados da PessoaJuridica antes de salvar
  await this.populate("pessoajuridica", "name").execPopulate();
  // Atribuindo o valor da propriedade "name" da PessoaJuridica à propriedade "name" do PlanoFree
  this.name = this.pessoajuridica.name;
  next();
});
*/

const PlanoFree = mongoose.model("PlanoFree", PlanoFreeSchema);

export default PlanoFree;
