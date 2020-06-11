import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface IBGECityResponse {
    nome: string;
}

interface Props {
    selectedUf: string;
    onChangeCity: (city: string) => void;
}
const City: React.FC<Props> = ({ selectedUf, onChangeCity }) => {

    const [ cities, setCities ] = useState<string[]>([]);

    const [ selectedCity, setSelectedCity ] = useState<string>('0');

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`;
        axios.get<IBGECityResponse[]>(url).then(response => {
            const cityNames = response.data.map(city => city.nome);

            setCities(cityNames);
        });
    }, [ selectedUf ]);

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;

        setSelectedCity(city);

        onChangeCity(city);
    }

    return (
        <div className="field">
            <label htmlFor="city">Cidade</label>
            <select
                name="city"
                id="city"
                onChange={ handleSelectCity }
                value={ selectedCity }>
                <option value="0">Selecione uma cidade</option>
                {
                    cities.map(city => (
                        <option key={ city } value={ city }>{ city }</option>
                    ))
                }
            </select>
        </div>
    );
}

export default City;
