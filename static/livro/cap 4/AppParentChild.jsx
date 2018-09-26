const contentNode = document.getElementById('contents');

const issues = [
    {
        id: 1, status: 'Open', owner: 'Ravan',
        created: new Date('2016-08-15'), effort: 5, completionDate: undefined, title: 'Error in console when clicking Add',
    },
    {
        id: 2, status: 'Assigned', owner: 'Eddie',
        created: new Date('2016-08-16'), effort: 14,
        completionDate: new Date('2016-08-30'),
        title: 'Missing bottom border on panel',
    }
];

class IssueFilter extends React.Component{
	render(){
		return(
			<div>This placeholder for IssueFilter</div>
		);
	};
}

class IssueTable extends React.Component{
	render(){
        const issueRows = this.props.issues.map(issue => <IssueRow key = {issue.id} issue = {issue}/>);
        return(
            <table className = "bordered-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Completion</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>{issueRows}</tbody>
            </table>                
        );
	}
}

class IssueRow extends React.Component{
    render(){
        const issue = this.props.issue;
        return (
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>{issue.completionDate ? issue.completionDate.toLocaleDateString() : ''}</td>
                <td>{issue.title}</td>
            </tr>
        )
    }
}

class IssueAdd extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e){
        e.preventDefault;
        
        var form = document.forms.issueAdd;
        
        var issue = [{
                owner: form.owner.value,
                title: form.title.value,
                status: 'New',
                created: new Date(),
            }];
        
        form.owner.value = "";
        form.title.value = "";
    }
    
	render(){
		return(
			<div>
                <form name = "issueAdd" onSubmit = {this.handleSubmit}>
                    <input type = "text" name = "owner" placeholder = "Owner"/>
                    <input type = "text" name = "title" placeholder = "Title"/>
                    <button>Adicionar</button>
                </form>
            </div>
		);
	};
}

class IssueList extends React.Component{
    constructor(){
        super();
        this.state = {issues: []};
        this.createIssue = this.createIssue.bind(this);
    }
    
    componentDidMount(){
        this.loadData();
    }
    
    loadData(){
        setTimeout(() => {
            this.setState({issues: issues});
        }, 1000);
    }
    
    createIssue(newIssue){
        var newIssues = this.state.issues.slice();
        newIssues.push(newIssue[0]);
        this.setState({issues: newIssues});
        alert("PASSEI AQUI!");
    }
    
    createTestIssue(){
        var issue = [{
            id: this.state.issues.length + 1,
            status: 'New', owner: 'Pieta', created: new Date(), title: 'Completion date should be optional',
        }];
        
        this.createIssue(issue);
    }
    
    render(){
		return(
			<div>
				<h1>Issue Tracker</h1>
				<IssueFilter />
				<hr />
				<IssueTable issues = {this.state.issues}/>
                <button onClick = {this.createTestIssue}>Add</button>
				<hr />
				<IssueAdd createIssue = {this.createIssue}/>
			</div>
		);
	}
}

ReactDOM.render(<IssueList />, contentNode);