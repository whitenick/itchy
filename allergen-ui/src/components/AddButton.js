import React from 'react';

const AddButton = () => {
    return (
        <div class="quad-button">
            <div class="letter-container">
                <div class="letter"><span><i class="fas fa-cart-plus"></i></span></div>
                <div class="letter"><span><i class="fas fa-user-plus"></i></span></div>
                <div class="letter"><span><i class="fas fa-envelope"></i></span></div>
                <div class="letter"><span><i class="fas fa-sms"></i></span></div>
                <div class="plus-sign">
                    <div class="plus-sign__vertical"></div>
                    <div class="plus-sign__horizontal"></div>
                </div>
            </div>
        </div>
    );
}

export default AddButton;