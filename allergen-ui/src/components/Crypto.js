import React from 'react';
import { useState } from 'react';


const Crypto = () => {
    const [isShown, showResult] = useState(false);

    const sendCryptoRequest = () => {
        showResult(true);
    }

    const CryptoResults = () => {
        if (isShown) {
            return (
                <div>
                    <div>HUGE crypto guy</div>
                </div>
            )
        }
        return null;
    }

    return (
        <div>
            <h1>Hello Crypto API</h1>
            <div>lets get this bread</div>
            <button onClick={sendCryptoRequest}>Get Bread (chaching)</button>
            <CryptoResults/>
        </div>
    );
}

export default Crypto;