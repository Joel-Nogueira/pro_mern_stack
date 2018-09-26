const contentNode = document.getElementById('contents');

class Parent extends React.Component{
    constructor(){
        super();
        this.state = {nome: "Joel"};
        this.mudaEstado = this.mudaEstado.bind(this);
        console.log("Construtor --> nome: " + this.state.nome);
    }

    mudaEstado(){
        this.setState(nome: "Joel Nogueira");
        console.log("mudaEstato() --> nome: " + this.state.nome);
    }

    render(){
        return(
            <div>
				<Child />
			</div>
        );
    }
}

class Child extends React.Component{
    render(){
        return(
            <form name = "issueAdd" onSubmit = {this.props.action}>
                <button>Mudar Estado</button>
            </form>
        );
    }
}

ReactDOM.render(<Parent />, contentNode);