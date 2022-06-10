import React from 'react';
import './pageHeader.scss';
import bg from "../../assets/images/footer-bg.jpg";


function PageHeader(props) {
    return (
        <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
            <h2>{props.children}</h2>
        </div>
    );
}
export default PageHeader;