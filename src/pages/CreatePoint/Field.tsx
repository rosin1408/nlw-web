import React, { ChangeEvent } from 'react';

interface Props {
    label: string;
    id: string;
    name: string;
    onChange: any;
}
const Field: React.FC<Props> = ({ label, id, name, onChange }) => {

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        
        onChange({ name, value });
    }

    return (
        <div className="field">
            <label htmlFor="name">{ label }</label>
            <input 
                type="text"
                id={ id }
                name={ name }
                onChange={ handleInputChange }
            />
        </div>
    );
}

export default Field;
