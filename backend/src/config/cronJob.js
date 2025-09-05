import {Cronjob} from "cron"; 
import { cronJobFunction } from "../models/appModels.js";

const job = new Cronjob("0 0 * * * *", cronJobFunction ,null , true);