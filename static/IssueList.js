'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('whatwg-fetch');

var _IssueAdd = require('./IssueAdd.js');

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

var _IssueFilter = require('./IssueFilter.js');

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueTable = function (_React$Component) {
    _inherits(IssueTable, _React$Component);

    function IssueTable() {
        _classCallCheck(this, IssueTable);

        return _possibleConstructorReturn(this, (IssueTable.__proto__ || Object.getPrototypeOf(IssueTable)).apply(this, arguments));
    }

    _createClass(IssueTable, [{
        key: 'render',
        value: function render() {
            var issueRows = this.props.issues.map(function (issue) {
                return _react2.default.createElement(IssueRow, { key: issue._id, issue: issue });
            });
            return _react2.default.createElement(
                'table',
                { className: 'bordered-table' },
                _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'th',
                            null,
                            'Id'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Status'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Owner'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Created'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Effort'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Completion'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Title'
                        )
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    null,
                    issueRows
                )
            );
        }
    }]);

    return IssueTable;
}(_react2.default.Component);

var IssueRow = function (_React$Component2) {
    _inherits(IssueRow, _React$Component2);

    function IssueRow() {
        _classCallCheck(this, IssueRow);

        return _possibleConstructorReturn(this, (IssueRow.__proto__ || Object.getPrototypeOf(IssueRow)).apply(this, arguments));
    }

    _createClass(IssueRow, [{
        key: 'render',
        value: function render() {
            var issue = this.props.issue;
            return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    issue._id
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    issue.status
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    issue.owner
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    issue.created.toDateString()
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    issue.effort
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    issue.completionDate ? issue.completionDate.toLocaleDateString() : ''
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    issue.title
                )
            );
        }
    }]);

    return IssueRow;
}(_react2.default.Component);

var IssueList = function (_React$Component3) {
    _inherits(IssueList, _React$Component3);

    function IssueList() {
        _classCallCheck(this, IssueList);

        var _this3 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

        _this3.state = { issues: [] };
        _this3.createIssue = _this3.createIssue.bind(_this3);
        return _this3;
    }

    _createClass(IssueList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this4 = this;

            fetch('/api/issues').then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log("Total count of records: ", data._metadata.total_count);
                        data.records.forEach(function (issue) {
                            issue.created = new Date(issue.created);
                            if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
                        });
                        _this4.setState({ issues: data.records });
                    });
                } else {
                    response.json().then(function (error) {
                        alert("Failed to fetch issues: " + error.message);
                    });
                }
            });
        }
    }, {
        key: 'createIssue',
        value: function createIssue(newIssue) {
            var _this5 = this;

            fetch('/api/issues', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newIssue)
            }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (updatedIssue) {
                        updatedIssue.created = new Date(updatedIssue.created);
                        if (updatedIssue.completionDate) updatedIssue.completionDate = new Date(updatedIssue.completionDate);

                        var newIssues = _this5.state.issues.concat(updatedIssue);
                        _this5.setState({ issues: newIssues });
                    });
                } else {
                    response.json().then(function (error) {
                        alert("Failed to add issue: " + error.message);
                    });
                }
            }).catch(function (err) {
                alert("Error in sending data to server: " + err.message);
            });
        }
    }, {
        key: 'createTestIssue',
        value: function createTestIssue() {
            var issue = [{
                id: this.state.issues.length + 1,
                status: 'New', owner: 'Pieta', created: new Date(), title: 'Completion date should be optional'
            }];

            this.createIssue(issue);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    'Issue Tracker'
                ),
                _react2.default.createElement(_IssueFilter2.default, null),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(IssueTable, { issues: this.state.issues }),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(_IssueAdd2.default, { createIssue: this.createIssue })
            );
        }
    }]);

    return IssueList;
}(_react2.default.Component);

exports.default = IssueList;