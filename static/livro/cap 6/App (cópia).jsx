const contentNode = document.getElementById('contents');

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
        var form = document.forms.issueAdd;
        
        var issue = {
                status: 'Assigned', 
                owner: form.owner.value,
                created: new Date(), 
                effort: 14,
                completionDate: new Date(),
                title: form.title.value
            };
        
        
        this.props.createIssue(issue);
        
        form.owner.value = "";
        form.title.value = "";

        e.preventDefault();
    }
    
	render(){
		return(
			<div>
                <form name = "issueAdd" onSubmit = {this.handleSubmit}>
                    <input type = "text" name = "owner" placeholder = "Owner"/>
                    <input type = "text" name = "title" placeholder = "Title"/>
                    <input type = "submit" value = "Adicionar"/>
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
        fetch('/api/issues').then(
                response => response.json()
            ).then(data => {
                console.log("Total count of records: ", data._metadata.total_count);
                data.records.forEach(issue => {
                    issue.created = new Date(issue.created);
                    if(issue.completionDate)
                        issue.completionDate = new Date(issue.completionDate);
                });
                this.setState({issues: data.records});
            }).catch(err => {
                console.log(err);
            });
    }
    
    createIssue(newIssue){
        fetch('/api/issues', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newIssue),
        }).then(response => {
            if(response.ok){
                response.json().then(updatedIssue => {
                    updatedIssue.created = new Date(updatedIssue.created);
                    if(updatedIssue.completionDate)
                        updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    
                    const newIssues = this.state.issues.concat(updatedIssue);
                    this.setState({issues: newIssues});
                });
            }
            else{
                response.json().then(error => {
                    alert("Failed to add issue: " + error.message);
                });
            }
        }).catch(err => {
            alert("Error in sending data to server: " + err.message);
        });
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
				<hr />
				<IssueAdd createIssue = {this.createIssue}/>
			</div>
		);
	}
}

ReactDOM.render(<IssueList />, contentNode);