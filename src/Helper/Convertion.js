
import moment from 'moment';

// convert Kelvin to celsius
export function convertK2C(kelvin) {
    var result = kelvin - 273.15;
    return result;
}

// convert date and time in utc format to specific format alongside with changing timezone according to selected location
export function convertDateTimeToLocal(date_time, timezone, format) {
    var result = moment(date_time * 1000).utcOffset(timezone/60).format(format);;
    return result;
}