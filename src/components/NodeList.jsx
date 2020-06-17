import React from 'react'


class NodeList extends React.Component{
    
    render(){
        return(
            <div className="list-group">

                <a href="#" className="list-group-item list-group-item-action">First item</a>
                <a href="#" className="list-group-item list-group-item-action">Second item</a>
                <a href="#" className="list-group-item list-group-item-action">Third item</a>

            </div>
        )
    }
}

export default NodeList