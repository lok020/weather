import React, { Component } from 'react';
import { Row, Col, Input, Button, Dropdown } from 'react-bootstrap';

// Custom module
import { isObjsEqual, isObjEmpty } from '../Helper/Obj_checking.js';
import { convertK2C, convertDateTimeToLocal } from '../Helper/Convertion.js';
import Condition from './Condition';
import Special_condition from './Special_condition';

// CSS & SCSS
import '../CSS/Weather.scss';

class Weather extends Component {
  timer = null;

  constructor(props) {
    super(props);
    this.state = {
      city_info: {},
    };
  }

  componentDidMount = () => {
    // default using london id: 2643743
    this.fetchUrl("2643743").then((data) => this.setState({city_info: data}) );

  }

  // potential issue: async and setState on didMount cause double loading on first load when app start
  fetchUrl = async (city_id) => {
    // using https://openweathermap.org/ to fetch the weather
    // documentation: https://openweathermap.org/current
    // example: https://bithacker.dev/fetch-weather-openweathermap-api-javascript
    try{
      const key = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=${key}`;
      let response = await fetch (url);
      if (response.ok) {
          let data = await response.json();
          return data;
      }
    }
    catch(error_message){
      // handle the error message
      console.log(error_message);
    }
  }

  citySelected = (e) => {
    this.fetchUrl(e.target.id).then((data) => this.setState({city_info: data}) );
  }
  
  render() {

    return (
      <div className='weather'>
        <div className='weather-block-env'>
          {isObjEmpty(this.state.city_info) ?
          <></>
          :
          <Row className='weather-block'>
            <Col lg="5" xs="12" className='weather-left'>
              <img src={"http://openweathermap.org/img/wn/" + this.state.city_info.weather[0].icon + "@2x.png"} className="weather-icon" id="weather_icon" alt="weather icon"/>
              <div className='weather-temperature'>
                {convertK2C(this.state.city_info.main.temp).toFixed()}&#8451;
              </div>
              <br/>
              <div className=''>
                {convertK2C(this.state.city_info.main.temp_min).toFixed()}&#8451;
                {" / " + convertK2C(this.state.city_info.main.temp_max).toFixed()}&#8451;
                {" Feels like " + convertK2C(this.state.city_info.main.feels_like).toFixed()}&#8451;
              </div>
              <div>
                {convertDateTimeToLocal(this.state.city_info.dt, this.state.city_info.timezone, "dddd, MMMM Do YYYY, h:mm:ss a")}
              </div>
            </Col>
            <Col lg="7" xs="12" className='weather-right'>
              <Row className='weather-select-env'>
                <Col xs="1">
                  <i className='material-icons weather-select-icon'>place</i>
                </Col>
                <Col xs="9">
                  <Dropdown className='weather-select'>
                    <Dropdown.Toggle className='weather-select-button'>
                      {this.state.city_info.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='weather-select-dropdown-env' onClick={this.citySelected}>
                      <Dropdown.Item id="2643743">London</Dropdown.Item>
                      <Dropdown.Item id="1819729">Hong Kong</Dropdown.Item>
                      <Dropdown.Item id="1850147">Tokyo</Dropdown.Item>
                      <Dropdown.Item id="5809844">Seattle</Dropdown.Item>
                      <Dropdown.Item id="5128638">New York</Dropdown.Item>
                      <Dropdown.Item id="2968815">Paris</Dropdown.Item>
                      <Dropdown.Item id="1835848">Seoul</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col xs="2">
                  <Button className="weather-refresh" onClick={this.fetchUrl}>
                    <i className='material-icons weather-refresh-button'>autorenew</i>
                  </Button>
                </Col>
              </Row>
              <div className='weather-condition-env'>
                <Row>
                  <Condition icon="opacity" title="Humidity" info={this.state.city_info.main.humidity} unit="&#x25;"/>
                  <Condition icon="perm_scan_wifi" title="Pressure" info={this.state.city_info.main.pressure} unit="hPa"/>
                  <Condition icon="remove_red_eye" title="Visibility" info={this.state.city_info.visibility} unit="m"/>
                </Row>
                <Row>
                  <Condition icon="wb_sunny" title="Sun Rise" info={convertDateTimeToLocal(this.state.city_info.sys.sunrise, this.state.city_info.timezone, "h:mm a")} unit=""/>
                  <Condition icon="brightness_1" title="Sun Set" info={convertDateTimeToLocal(this.state.city_info.sys.sunset, this.state.city_info.timezone, "h:mm a")} unit=""/>
                  <Condition icon="filter_drama" title="Cloudiness" info={this.state.city_info.clouds.all} unit="&#x25;"/>
                </Row>
                <Special_condition icon="warning" info={this.state.city_info}/>
              </div>
            </Col>
          </Row>
          }
        </div>
      </div>
    );
  }
}

export default Weather;