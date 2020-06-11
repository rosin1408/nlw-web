import React, { useState, useEffect } from 'react';
import api from '../../services/api';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface Props {
    onChangeItem: (selectdItems: number[]) => void;
}

const Items: React.FC<Props> = ({ onChangeItem }) => {

    useEffect(() => {
        api.get('/items').then(response => setItems(response.data) );
    }, []);

    const [ items, setItems ] = useState<Item[]>([]);

    const [ selectdItems, setSelectedItems ] = useState<number[]>([]) ;

    function handleSelectItem(id: number) {
        const alreadySelected = selectdItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectdItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([ ...selectdItems, id ]);
        }
        
        onChangeItem(selectdItems);
    }

    return (
        <ul className="items-grid">
            {
                items.map(item => (
                    <li 
                        key={ item.id }
                        onClick={ () => handleSelectItem(item.id) }
                        className={ selectdItems.includes(item.id) ? 'selected' : '' }
                    >
                        <img src={ item.image_url } alt={ item.title }/>
                        <span>{ item.title }</span>
                    </li>
                ))
            }
            
        </ul>
    );
}

export default Items;
