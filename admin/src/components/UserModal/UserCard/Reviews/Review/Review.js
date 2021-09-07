import React from 'react';
import './Review.css'

function Review() {
    return (
        <div className="Review">
            <h3>Aman Patidar</h3>
            <p> <span>Rating: </span> 4.9 </p>
            <p> <span>Review: </span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci provident dolorum autem quas ipsa architecto velit sint animi perferendis nam veniam et dolore, nostrum mollitia magnam omnis magni fugiat. Commodi nostrum enim cum eos labore. </p>
            <a href={`tel:`}>Call</a>
        </div>
    )
}

export default Review
