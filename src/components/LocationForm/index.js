import React, { useState } from 'react';
import NumericInput from 'react-numeric-input';

export default () => {
    const [decimalValue, setDecimalValue] = useState(true);
    const [coordinates, setCoordinates] = useState({lat: 0, lon: 0});

    const handleRadio = value => e => {
        setDecimalValue(value);
    }

    const handleBlur = e => {
        e.preventDefault();
        e.target.value = +e.target.value;
    }

    const handleChange = (type, boundary) => e => {
        e.preventDefault();
        const regex = /^[-+]?\d*?(\.\d{0,7})?$/;
        let value = e.target.value;

        console.log(value, value.match(regex));

        if (value.match(regex)) {
            setCoordinates({...coordinates, [type]: value});

            if (value < -boundary) {
                setCoordinates({...coordinates, [type]: -boundary});
            } else if (value > boundary) {
                setCoordinates({...coordinates, [type]: boundary});
            }
        } else if (!value) {
            setCoordinates({...coordinates, [type]: 0});
        } 
    }

    return (
        <div>
            <span>
                <span>Location</span>
                <button>✖</button>
            </span>
            <form onSubmit={e => {e.preventDefault()}}>
                <div>
                    <span>Metrics</span>
                    <div>
                        <label>
                            Decimal
                            <input type='radio' name='metrics' value='Decimal' checked={decimalValue} onClick={handleRadio(true)} />
                        </label>
                        <span>/</span>
                        <label>
                            DMS
                            <input type='radio' name='metrics' value='Decimal' checked={!decimalValue} onClick={handleRadio(false)} />
                        </label>
                    </div>
                </div>
                <div>
                    <label>
                        <span>Latitude</span>
                        <input type='text' placeholder='00.0000000' value={coordinates.lat} onBlur={handleBlur} onChange={handleChange('lat', 90)} />
                        {/* <NumericInput min={-90} max={90} value={0} precision={7}   /> */}
                    </label>
                    <label>
                        <span>Longitude</span>
                        <NumericInput min={-180} max={180} value={0} maxLength={11}  />
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