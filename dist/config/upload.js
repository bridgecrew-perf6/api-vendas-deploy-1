"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//o Multer é um middleware responsavel por fazer upload de arquivos

/* o metodo resolve é pra pegar a URI do arquivo,os 2 pontinhos servem
pra voltar um nivel na arvore de arquivos. dirname seria o diretorio atual do arquivo upload,
ai eu volto um nivel pra pasta src, e volto mais um pra raiz. Na raiz que vai ter a pasta
uploads, onde de fato os arquivos vao ser adicionados

*/
const uploadFolder = _path.default.resolve(__dirname, '..', '..', 'uploads');

var _default = {
  directory: uploadFolder,
  storage: _multer.default.diskStorage({
    destination: uploadFolder,

    filename(request, file, callback) {
      //eu crio um hash pra compor o nome do arquivo, assim eu garanto que a chance de ter 2 arquivos com mesmo nomes seja quase impossivel
      const fileHash = _crypto.default.randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    }

  })
};
exports.default = _default;