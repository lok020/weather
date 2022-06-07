import React, { Component } from 'react';
import { Row, Col, Input, Button, Dropdown } from 'react-bootstrap';

class Special_condition extends Component {
    windDegreeToText = (degree) => {
        if(degree>337.5) return 'Northerly';
        if(degree>292.5) return 'North Westerly';
        if(degree>247.5) return 'Westerly';
        if(degree>202.5) return 'South Westerly';
        if(degree>157.5) return 'Southerly';
        if(degree>122.5) return 'South Easterly';
        if(degree>67.5) return 'Easterly';
        if(degree>22.5){return 'North Easterly';}
        return 'Northerly';
    }

    updateSpecialCondition = () => {
        const { icon, info } = this.props;
        let condition_row = [];
        let condition_col = [];
        if (info.rain){
            let rain_info = [];
            if (info.rain["1h"]){
                rain_info.push(
                    <div key="rain_1h">{"rain in 1H: " + info.rain["1h"] + "mm"}</div>
                );
            }
            if (info.rain["3h"]){
                rain_info.push(
                    <div key="rain_3h">{"rain in 3H: " + info.rain["3h"] + "mm"}</div>
                );
            }
            condition_col.push(
                <Col key="rain" className='weather-condition'>
                    <i className="material-icons weather-condition-icon">{icon}</i>
                    <div className="weather-condition-title">{"Rain"}</div>
                    <div className="weather-condition-info"> </div>
                </Col>
            );
        }
        if (info.snow){
            let snow_info = [];
            if (info.snow["1h"]){
                snow_info.push(
                    <div key="snow_1h">{"snow in 1H: " + info.snow["1h"] + "mm"}</div>
                );
            }
            if (info.snow["3h"]){
                snow_info.push(
                    <div key="snow_3h">{"snow in 3H: " + info.snow["3h"] + "mm"}</div>
                );
            }
            condition_col.push(
                <Col key="snow" className='weather-condition'>
                    <i className="material-icons weather-condition-icon">{icon}</i>
                    <div className="weather-condition-title">{"Snow"}</div>
                    <div className="weather-condition-info"> </div>
                </Col>
            );
        }
        if (info.wind){
            let wind_info = [];
            if (info.wind.speed){
                wind_info.push(
                    <div key="wind_speed">{"speed: " + info.wind.speed + "m/s"}</div>
                );
            }
            if (info.wind.deg){
                wind_info.push(
                    <div key="wind_deg">{"direction: " + this.windDegreeToText(info.wind.deg)}</div>
                );
            }
            if (info.wind.gust){
                wind_info.push(
                    <div key="wind_gust">{"gust: " + info.wind.gust + "m/s"}</div>
                );
            }
            condition_col.push(
                <Col key="wind" className='weather-condition'>
                    <i className="material-icons weather-condition-icon">{icon}</i>
                    <div className="weather-condition-title">{"Wind"}</div>
                    <div className="weather-condition-info">{wind_info}</div>
                </Col>
            );
        }
        condition_row.push(<Row key="special_condition">{condition_col}</Row>);
        return condition_row;
    }

    render() {
        return (
            <>
                {this.updateSpecialCondition()}
            </>
        )
    }
}

export default Special_condition;  