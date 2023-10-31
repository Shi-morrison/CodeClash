"use strict";

var _mithril = _interopRequireDefault(require("mithril"));
var _components = require("./components");
var _page = require("./vsmode/page");
var _gameContent = require("./game/gameContent");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function App() {
  return {
    view: function view() {
      return (0, _mithril["default"])("div", null, (0, _mithril["default"])("h1", null, "Hello world"));
    }
  };
}
_mithril["default"].route(document.body, "/", {
  "/": App,
  "/login": _components.Login,
  "/signup": _components.SignUp,
  "/vsmode": _page.vsModePage,
  "/game": _gameContent.gamePageContent
});
//# sourceMappingURL=index.js.map