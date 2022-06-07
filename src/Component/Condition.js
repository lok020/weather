import React, { Component } from 'react';
import { Row, Col, Input, Button, Dropdown } from 'react-bootstrap';

class Condition extends Component {
    render() {
        const { icon, title, info, unit } = this.props;
        return (
            <Col className='weather-condition'>
                <i className="material-icons weather-condition-icon">{icon}</i>
                <div className="weather-condition-title">{title}</div>
                <div className="weather-condition-info">{info}{unit}</div>
            </Col>
        )
    }
}

export default Condition;  