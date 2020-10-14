import React, {useState} from 'react';

export default () => {
    const [metrics, setMetrics] = useState('dec');
    const [coordinates, seCoordinates] = useState({lat: 0, lon: 0});

    const handleChange = type => e => {
        e.preventDefault();
        seCoordinates({...coordinates, [type]: e.target.value});
    }

    return (
        <div>
            <span>
                <span>Location</span>
                <button>✖</button>
            </span>
            <form onclick={e => {e.preventDefault()}}>
                <div>
                    <span>Metrics</span>
                    <div>
                        <button>Decimal</button>
                        <span>/</span>
                        <button>DMS</button>
                    </div>
                </div>
                <div>
                    <label>
                        <span>Latitude</span>
                        <input name='lat' type='text' onChange={handleChange(this.name)}/>
                    </label>
                    <label>
                        <span>Longitude</span>
                        <input name='lon' type='text' onChange={handleChange(this.name)}/>
                    </label>
                </div>
                <hr />
                <div>
                    <span>Output (decimal)</span>
                    <span>Lat: {coordinates.lat}</span>
                    <span>/</span>
                    <span>Lon: {coordinates.lon}</span>
                </div>
            </form>
        </div>
    );
}