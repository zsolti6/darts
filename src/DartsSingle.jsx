import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { DartsMod } from "./DartsMod";

export const DartsSingle = () => {
    const { dartsId } = useParams();
    const [darts, setDarts] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        (async () => {
            try{
                const valasz = await axios.get(`https://darts.sulla.hu/darts/${dartsId}`);
                const dartsos = await valasz.data;
                setDarts(dartsos);
            }
            catch(hiba){
                console.log(hiba);
            }
            finally{
                setPending(false);
            }
        })();
        
    }, [dartsId]);

    return(
        <div className='p-5 m-auto text-center content bg-ivory'>
            {isPending || !dartsId ? (<div className='spinner-border'></div>) : (
                <div>
                    <h1>Dartsozók</h1>
                    <div className='row row-cols-1 row-cols-md-3 g-4 justify-content-center align-items-center'>
                        <div className='col '>
                            <div className='card h-200'>
                                <h3 className='text-dark'>Dartsozó neve: {darts.name}</h3>
                                <h4 className='text-dark'>Születési éve: {darts.birth_date}</h4>
                                <h4 className='text-dark'>Megnyert világbajnokságai: {darts.world_ch_won}</h4>
                                <div className='card-body'>
                                    <Link to={darts.profile_url} className='fs-6' target='_blank'>Profil link</Link>
                                    <img src={darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800"} alt={darts.name} className='img-fluid' style={{width: "250"}}/>    
                                </div>
                                <div>
                                    <Link to={`/del-darts/${dartsId}`}><i className='bi bi-backspace-fill fs-2'></i></Link>&nbsp;&nbsp;&nbsp;
                                    <Link to={`/mod-darts/${dartsId}`}><i className='bi bi-pencil-square fs-2'></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}