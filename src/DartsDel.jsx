import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";

export const DartsDel = () => {
    const params = useParams();
    const id = params.dartsId;
    const navigate = useNavigate();
    const [darts, setDarts] = useState([]);
    useEffect(() => {
        (
            async () => {
                try{
                    const res = await axios.get(`https://darts.sulla.hu/darts/${id}`);
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
            <p className='text-danger'>Születési éve: {darts.birth_date}</p>
            <p className='text-danger'>Megnyert világbajnokságai: {darts.world_ch_won}</p>
            <div className='card-body'>
                <Link to={darts.profile_url} className='fs-3 bg-success rounded text-white' target='_blank'><button className="btn btn-success">Profil link</button></Link>
                <br></br>
                <br></br>
                <img src={darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800"} alt={darts.name} className='img-fluid' style={{maxHeight: 200}}/>    
            </div>
            <form onSubmit={(event) => {
                event.preventDefault();
                axios.delete(`https://darts.sulla.hu/darts/${id}`).then(() => {
                    navigate("/");
                });
            }}>
                <br></br>
                <NavLink to="/"><button className="bi bi-text-paragraph fs-2 bg-warning rounded fs-3 border-0 text-dark">Vissza</button></NavLink>&nbsp;&nbsp;&nbsp;
                <button className="bi bi-trash3 fs-2 bg-danger rounded fs-3 border-0 text-white" type="submit">Törlés</button>
            </form>
        </div>
    );
}