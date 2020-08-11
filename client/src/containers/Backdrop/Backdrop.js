import React from "react";

import '../Backdrop/Backdrop.css';

const backdrop = props => (
    <div className="backdrop" onClick={props.click} />
);

export default backdrop;