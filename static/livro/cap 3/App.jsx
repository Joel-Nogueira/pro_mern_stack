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
		const borderedStyle = {border: "1px solid silver", padding: 6};
        return(
            <table style = {{borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <th style={borderedStyle}>Id</th>
                        <th style={borderedStyle}>Title</th>
                    </tr>
                </thead>
                <tbody>
                    <IssueRow issue_id = {1}>Error in console when clicking Add</IssueRow>
                    <IssueRow issue_id = {2}>Missing bottom <b>border</b> on panel</IssueRow>
                </tbody>
            </table>
        )
	}
}

class IssueRow extends React.Component{
    render(){
        const borderedStyle = {border: "1px solid silver", padding: 4};
        return (
            <tr>
                <td style = {borderedStyle}>{this.props.issue_id}</td>
                <td style = {borderedStyle}>{this.props.children}</td>
            </tr>
        )
    }
}

class IssueAdd extends React.Component{
	render(){
		return(
			<div>This placeholder for IssueAdd</div>
		);
	};
}

class IssueList extends React.Component{
	render(){
		return(
			<div>
				<h1>Issue Tracker</h1>
				<IssueFilter />
				<hr />
				<IssueTable issues = {issues}/>
				<hr />
				<IssueAdd />
			</div>
		);
	}
}

ReactDOM.render(<IssueList />, contentNode);