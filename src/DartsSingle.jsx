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
                    <div className='row row-cols-1 row-cols-md-3 g-4 justify-content-center align-items-center'>
                        <div className='col '>    
                        <h3 className='text-dark'>Dartsozó neve: {darts.name}</h3>
                            <div className='card h-200'>
                                <p className='text-danger'>Születési éve: {darts.birth_date}</p>
                                <p className='text-danger'>Megnyert világbajnokságai: {darts.world_ch_won}</p>
                                <div className='card-body'>
                                <Link to={darts.profile_url} className='fs-3 bg-success rounded text-white' target='_blank'><button className="btn btn-success">Profil link</button></Link>
                                <br></br>
                                <img src={darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800"} alt={darts.name} className='img-fluid' style={{maxHeight: 200}}/>    
                                </div>
                                <div>
                                    <Link to={`/darts/${darts.id}`}><i className='bi bi-text-paragraph fs-3 bg-primary text-white rounded'></i></Link>&nbsp;&nbsp;&nbsp;
                                    <Link to={`/mod-darts/${darts.id}`}><i className='bi bi-pencil-square fs-3 bg-warning text-black rounded'></i></Link>&nbsp;&nbsp;&nbsp;
                                    <Link to={`/del-darts/${darts.id}`}><i className='bi bi-trash fs-3 bg-danger text-white rounded'></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}