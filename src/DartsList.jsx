import React, { useSate, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const DartsList = () => {
    const [dartses, setDartses] = useState([]);
    const [isPending, setPending] = useState(false);
    
    useEffect(() =>{
        setPending(true);
        axios.get('https://darts.sulla.hu/darts')
        .then((valasz) => valasz.data)
        .then((dartsosok) => setDartses(dartsosok))
        .catch((hiba) => console.log(hiba))
        .finally(() => setPending(false));
    }, []);

    return(
        <div className='p-5 m-auto text-center content bg-ivory'>
            {isPending ? (<div className='spinner-border'></div>) : (
                <div>
                    <h2>Dartsozók</h2>
                    <div className='row row-cols-1 row-cols-md-3 g-4'>
                    {dartses.map((darts, index) => (
                        <div className='col' key={index}>
                        <div className='card h-100'>
                            <p className='text-dark'>Dartsozó neve: {darts.name}</p>
                            <p className='text-dark'>Születési éve: {darts.birth_date}</p>
                            <p className='text-dark'>Megnyert világbajnokságai: {darts.world_ch_won}</p>
                            <div className='card-body'>
                                <Link to={darts.profile_url} className='fs-4' target='_blank'>Profil link</Link>
                                <Link key={darts.id} to={`/darts/${darts.id}`}><img src={darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800"} alt={darts.name} className='img-fluid' style={{width: "200"}}/></Link>    
                            </div>
                            <div>
                                    <Link to={`/darts/${darts.id}`}><i className='bi bi-text-paragraph fs-2'></i></Link>&nbsp;&nbsp;&nbsp;
                                    <Link to={`/mod-darts/${darts.id}`}><i className='bi bi-pencil-square fs-2'></i></Link>&nbsp;&nbsp;&nbsp;
                                    <Link to={`/del-darts/${darts.id}`}><i className='bi bi-backspace-fill fs-2'></i></Link>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
}