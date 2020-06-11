import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Dropzone from '../../components/Dropzone';
import Header from '../../components/Header';
import EcoletaMap from '../../components/EcoletaMap';
import Items from './Items';
import FederalUnity from './FederalUnity';
import City from './City';

import './styles.css';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

const CreatePoint = () => {

    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });

    const [ selectdItems, setSelectedItems ] = useState<number[]>([]) ;

    const [ selectedUf, setSelectedUf ] = useState<string>('0');

    const [ selectedCity, setSelectedCity ] = useState<string>('0');

    const [ selectedPosition, setSelectedPosition ] = useState<[number, number]>([0,0]);

    const [ selectedFile, setSelectedFile] = useState<File>();

    const history = useHistory();

    function handleSelectUf(uf: string) {
        setSelectedUf(uf);
    }

    function handleSelectCity(city: string) {
        setSelectedCity(city);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(itemsIds: [number]) {
        setSelectedItems(itemsIds);
    }

    function handleChangeLocation(location: [number, number]) {
        setSelectedPosition(location);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [ latitude, longitude ] = selectedPosition;
        const items = selectdItems;

        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));

        if (selectedFile) {
            data.append('image', selectedFile);
        }

        api.post('points', data).then(() => {
            alert('Ponto de coleta criado!');
            history.push('/');
        });
    }

    return (
        <div id="page-create-point">
            <Header />

            <form onSubmit={ handleSubmit }>
                <h1>Cadastro do Ponto de Coleta</h1>

                <Dropzone onFileUploaded={ setSelectedFile }/>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            onChange={ handleInputChange }
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                id="whatsapp"
                                name="whatsapp"
                                onChange={ handleInputChange }
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <EcoletaMap onChangeLocation={ handleChangeLocation }/>

                    <div className="field-group">
                        <FederalUnity onChangeUF={ handleSelectUf }/>
                        
                        <City selectedUf={ selectedUf } onChangeCity={ handleSelectCity }/>
                    </div>
                </fieldset>


                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                   <Items onChangeItem={ handleSelectItem }/>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    )
}

export default CreatePoint;
