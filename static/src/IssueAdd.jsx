import React, {Component} from 'react';

export default class IssueAdd extends React.Component{
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