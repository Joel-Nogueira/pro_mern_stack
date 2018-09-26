"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var Parent = function (_React$Component) {
    _inherits(Parent, _React$Component);

    function Parent() {
        _classCallCheck(this, Parent);

        var _this = _possibleConstructorReturn(this, (Parent.__proto__ || Object.getPrototypeOf(Parent)).call(this));

        _this.state = { nome: "Joel" };
        _this.mudaEstado = _this.mudaEstado.bind(_this);
        console.log("Construtor --> nome: " + _this.state.nome);
        return _this;
    }

    _createClass(Parent, [{
        key: "mudaEstado",
        value: function mudaEstado() {
            this.setState(nome);
            console.log("mudaEstato() --> nome: " + this.state.nome);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Child, null)
            );
        }
    }]);

    return Parent;
}(React.Component);

var Child = function (_React$Component2) {
    _inherits(Child, _React$Component2);

    function Child() {
        _classCallCheck(this, Child);

        return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments));
    }

    _createClass(Child, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { name: "issueAdd", onSubmit: this.props.action },
                React.createElement(
                    "button",
                    null,
                    "Mudar Estado"
                )
            );
        }
    }]);

    return Child;
}(React.Component);

ReactDOM.render(React.createElement(Parent, null), contentNode);