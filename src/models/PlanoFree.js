import mongoose from "mongoose";

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

const PlanoFreeSchema = new mongoose.Schema({
  categoria: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },
  carrossel: CarrosselSchema,
  funcionamento: FuncionamentoSchema,
  pessoajuridica: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PessoaJuridica",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Adicionando um gancho (hook) para pré-salvar, que popula a propriedade "name" antes de salvar
PlanoFreeSchema.pre("save", async function (next) {
  // Populando o documento com os dados da PessoaJuridica antes de salvar
  await this.populate("pessoajuridica", "name").execPopulate();
  // Atribuindo o valor da propriedade "name" da PessoaJuridica à propriedade "name" do PlanoFree
  this.name = this.pessoajuridica.name;
  next();
});

const PlanoFree = mongoose.model("PlanoFree", PlanoFreeSchema);

export default PlanoFree;
