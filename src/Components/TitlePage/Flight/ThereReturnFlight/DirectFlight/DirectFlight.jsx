import React from "react";
import style from "./DirectFlight.module.css";
import * as moment from "moment";
import "moment/locale/ru";

const DirectFlight = ({ item, getTimeFromMins, duration }) => {
  moment.locale("ru");
  const dateDeparture = moment(item.departureDate);
  const dateArrival = moment(item.arrivalDate);
  return (
    <div className={style.direct_flight}>
      <div className={style.city}>
        <div className={style.departure}>
          {item.departureCity === undefined
            ? item.departureAirport.caption
            : item.departureCity.caption}
          , {item.departureAirport.caption}{" "}
          <p className={style.blue}>({item.departureAirport.uid})</p>
        </div>
        <div className={style.blue}>→</div>
        <div className={style.arrival}>
          {item.arrivalCity.caption}, {item.arrivalAirport.caption}{" "}
          <p className={style.blue}>({item.arrivalAirport.uid})</p>
        </div>
      </div>
      <div className={style.underline}></div>
      <div className={style.date_flight}>
        <p>{dateDeparture.format("llll")}</p>
        <p>{getTimeFromMins(duration)}</p>
        <p>{dateArrival.format("llll")}</p>
      </div>
      <div className={style.line_flight}></div>
      <div className={style.airline_name}>
        Рейс выполняет: {item.airline.caption}
      </div>
    </div>
  );
};

export default DirectFlight;
