import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface IBGEUFResponse {
    sigla: string;
}

interface Props {
    onChangeUF: (uf: string) => void;
}
const FederalUnity: React.FC<Props> = ({ onChangeUF }) => {
    const [ ufs, setUfs ] = useState<string[]>([]);

    const [ selectedUf, setSelectedUf ] = useState<string>('0');

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);

            setUfs(ufInitials);
        });
    }, []);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;

        setSelectedUf(uf);

        onChangeUF(uf);
    }

    return (
        <div className="field">
            <label htmlFor="uf">Estado (UF)</label>
            <select 
                name="uf"
                id="uf"
                onChange={ handleSelectUf }
                value={ selectedUf }
            >
                <option value="0">Selecione uma uf</option>
                {
                    ufs.map(uf => (
                        <option key={ uf } value={ uf }>{ uf }</option>
                    ))
                }
            </select>
        </div>
    );
}

export default FederalUnity;
