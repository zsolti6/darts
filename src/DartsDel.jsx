import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export const DartsDel = () => {
    const params = useParams();
    const id = params.dartsId;
    const navigate = useNavigate();
    const [darts, setDarts] = useState([]);
    useEffect(() => {
        (
            async () => {
                try{
                    const res = await fetch(`https://darts.sulla.hu/darts/${id}`);
                    const darts = await res.json();
                    setDarts(darts);
                }
                catch(error){
                    console.log("Hiba: ", error);
                    
                }
            }
        )();
    }, [id])
    return(
        <div className="container mt-5">
            <h3 className='text-dark'>Dartsozó neve: {darts.name}</h3>
            <h4 className='text-dark'>Születési éve: {darts.birth_date}</h4>
            <h4 className='text-dark'>Megnyert világbajnokságai: {darts.world_ch_won}</h4>
            <div className='card-body'>
                <Link to={darts.profile_url} className='fs-6' target='_blank'>Profil link</Link>
                <img src={darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800"} alt={darts.name} className='img-fluid' style={{width: "250"}}/>    
            </div>
            <form onSubmit={(event) => {
                event.preventDefault();
                fetch(`https://darts.sulla.hu/darts/${id}`, {
                    method: "DELETE",
                }).then(() => {
                    navigate("/");
                });
            }}>
                <button className="bi bi-trash3 fs-2" type="submit">Törlés</button>
                <button className="bi bi-trash3 fs-2">Vissza</button>
            </form>
            <div>
                <Link to={`/del-darts/${id}`}><i className='bi bi-backspace-fill fs-2'></i></Link>&nbsp;&nbsp;&nbsp;
                <Link to={`/mod-darts/${id}`}><i className='bi bi-trash3 fs-2'></i></Link>
            </div>
        </div>
    );
}