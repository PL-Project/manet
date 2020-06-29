import React from 'react'

class LinkTable extends React.Component{

    constructor(props){
        super(props);

        this.createItems = this.createItems.bind(this);

        this.state={
            linkList: []
        }
    }
    componentDidMount(){
        this.createItems();
    }

    createItems(){
        this.setState({
            linkList: this.props.linkList.map( (link,key)=>{
                return <li key={link.id}>{link.id}</li>
            } )

        })
    }

    render(){
        return(
            <div>
                <ul>
                    {this.state.linkList}
                </ul>

            </div>
        )
    }

}

export default LinkTable