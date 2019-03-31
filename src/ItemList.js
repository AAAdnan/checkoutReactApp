import React from 'react';
import PropTypes from 'prop-types';
import './Item.css';

class ItemList extends React.PureComponent {
    static propTypes = {
        items: PropTypes.array.isRequired
    }

    render() {
        return (
            <ul>
                {this.props.items.map( item=> 
                    <li key={item.value}>{item.id}</li>
                )}
            </ul>
        );
    }
}

export default ItemList;