import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const DartsMod = () => {
    const params = useParams();
    const id = params.dartsId;
    const navigate = useNavigate();
    const [darts, setDarts] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });

    useEffect(() => {
        const fetchDarts = async() => {
            try {
                const response = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                setDarts(response.data);
            } catch (error) {
                console.log("Hiba a fetch-elésben: ", error);
            }
        };
        fetchDarts();
    }, [id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setDarts(prevState => ({
            ...prevState,
            [name] : value
        }));
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://darts.sulla.hu/darts/${id}`, darts)
        .then(()=>{
            navigate("/");
        })
        .catch(error => {
            console.log("Hiba a darts adatok frissítésében: ", error);
        })
    }

    return(
        <div className="p-5 conent bg-whitesmoke text-center">
            <h2>Dartsozó modosítása</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Dartsozó neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control"
                        defaultValue={darts.name} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Születési éve:</label>
                    <div className="col-sm-9">
                        <input type="date" name="date" className="form-control"
                        defaultValue={darts.birth_date} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Nyert világbajnokságai:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control"
                        value={darts.world_ch_won.toString()} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Profil url:</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control"
                        defaultValue={darts.profile_url} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Kép url:</label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" className="form-control"
                        defaultValue={darts.image_url} onChange={handleInputChange}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
    );
};