import * as express from "express";
let route = express.Router();
import singletask from "../controller/singletask";
import orderby from "../controller/orderby";
import frame from "../controller/frame";
import simpleform from "../controller/simpleform";
import attendance from "../controller/attendance";
import result from "../controller/result";
import fetchusingquery from "../controller/fetchusingquery";
import dynamicgrid from "../controller/dynamicgrid";
import delimeter from "../controller/delimeter";
import generateform from "../controller/generateform";
import ajaxform from "../controller/ajaxform";
import fetchcity from "../controller/fetchcity";
import timestamp from "../controller/timestamp";
import login from "../controller/login";
import error from "../controller/error";

route.use(singletask);
route.use(orderby);
route.use(attendance);
route.use(result);
route.use(fetchusingquery);
route.use(dynamicgrid);
route.use(delimeter);
route.use(generateform);
route.use(simpleform);
route.use(ajaxform);
route.use(fetchcity);
route.use(timestamp);
route.use(frame);
route.use(login);
route.use(error);

export default route;