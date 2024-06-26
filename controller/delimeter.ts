import * as express from "express";
let route = express.Router();
import { Request, Response } from "express";
import checkAuth from "../middlewares/checkauth";
import con from "../models/database";

import parser from "body-parser";
import { RowDataPacket } from "mysql2";

route.use(parser.json());
route.use(parser.urlencoded({ extended: false }));

route.get("/sch", checkAuth, (req: Request, res: Response) => {
  res.render("specialchar/home");
});

route.post("/sch", checkAuth, async (req: Request, res: Response) => {
  let fname: string[] = [],
    lname: string[] = [],
    email: string[] = [],
    number: string[] = [],
    city: string[] = [],
    bg: string[] = [];
  let jsonData = req.body;

  let search = jsonData["query"];

  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (format.test(`${search}`)) {
    let str = search.replace(/(?=[$-/:-?{-~!"^_`\[\]])/gi, ",");

    let val = str.split(",");

    for (var i = 0; i < val.length; i++) {
      if (val[i].startsWith("_")) {
        let firstname = val[i].replace("_", "");
        fname.push(firstname);
      }
      if (val[i].startsWith("^")) {
        let lastname = val[i].replace("^", "");
        lname.push(lastname);
      }
      if (val[i].startsWith("$")) {
        let em = val[i].replace("$", "");
        email.push(em);
      }
      if (val[i].startsWith("!")) {
        let num = val[i].replace("!", "");
        number.push(num);
      }
      if (val[i].startsWith("{")) {
        let cy = val[i].replace("{", "");
        city.push(cy);
      }
      if (val[i].startsWith(":")) {
        let blood = val[i].replace(":", "");
        bg.push(blood);
      }
    }


    let q1: string = `select * from student_master26 where `;

    if (fname.length >= 1) {
      for (let i = 0; i < fname.length; i++) {
        q1 += `firstname like '%${fname[i]}%' or `;
      }
      q1 = q1.slice(0, q1.length - 3) + "and ";
    }
    if (lname.length >= 1) {
      for (let i = 0; i < lname.length; i++) {
        q1 += `lastname like '%${lname[i]}%' or `;
      }
      q1 = q1.slice(0, q1.length - 3) + "and ";
    }
    if (email.length >= 1) {
      for (let i = 0; i < email.length; i++) {
        q1 += `email like '%${email[i]}%' or `;
      }
      q1 = q1.slice(0, q1.length - 3) + "and ";
    }
    if (number.length >= 1) {
      for (let i = 0; i < number.length; i++) {
        q1 += `mobile_number like '%${number[i]}%' or `;
      }
      q1 = q1.slice(0, q1.length - 3) + "and ";
    }
    if (city.length >= 1) {
      for (let i = 0; i < city.length; i++) {
        q1 += `city like '%${city[i]}%' or `;
      }
      q1 = q1.slice(0, q1.length - 3) + "and ";
    }
    if (bg.length >= 1) {
      for (let i = 0; i < bg.length; i++) {
        q1 += `blood_group like '%${bg[i]}%' or `;
      }
      q1 = q1.slice(0, q1.length - 3) + "and ";
    }
    q1 = q1.slice(0, q1.length - 4);

    const result = await con.getall(q1) as Array<RowDataPacket>;
    res.render("specialchar/data.ejs", { users: result });
  } else {
    res.render("specialchar/home2.ejs");
  }
});
export default route;
