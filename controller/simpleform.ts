import * as express from "express";
let route = express.Router();
import { Request, Response } from "express";
import checkAuth from "../middlewares/checkauth";
import { check, validationResult } from "express-validator";
import con from "../models/database";

import parser from "body-parser";
import { ResultSetHeader, RowDataPacket } from "mysql2";
route.use(parser.json());
route.use(parser.urlencoded({ extended: false }));
const urlencodedParser = parser.urlencoded({ extended: false });
interface FormData {
  phone:string,
  rel_status:string,
  address1:string,
   address2:string,
  bd:string,
  fname: string;
  lname: string;
  designa: string;
  dob: string;
  email: string;
  number: string;
  zipcode: string;
  add1: string;
  add2: string;
  city: string;
  state: string;
  gender: string;
  relstatus: string;
  lan1: string;
  able1?: boolean;
  lan2: string;
  able2?: boolean;
  lan3: string;
  able3?: boolean;
  tech1: string;
  level1: string;
  tech2: string;
  level2: string;
  tech3: string;
  level3: string;
  tech4: string;
  level4: string;
  name1: string;
  mobileno1: string;
  rel1: string;
  name2: string;
  mobileno2: string;
  rel2: string;
  name3: string;
  mobileno3: string;
  rel3: string;
  preloc: string;
  notice: string;
  exctc: string;
  curctc: string;
  depa: string;
  board_name: string[];
  py: string[];
  percentage: string[];
  companyname: string[];
  designation: string[];
  from: string[];
  to: string[];
  name: string[];
  mobileno: string[];
  rel: string[];
}

route.get("/inu", checkAuth, (req: Request, res: Response) => {
  res.render("forminu/home");
});

route.post(
  "/inu",
  urlencodedParser,
  [
    check("fname", "This username must be 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    check("lname", "This lastname must be 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    check("designa", "This designation must be 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    check("dob", "Enter date-of-birth in yyyy-mm-dd format").isDate(),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
    // check("number", "Please enter a valid Mobile Number").isMobilePhone(),
    check("zipcode", "zipcode length should be 6 characters").isLength({
      min: 6,
      max: 6,
    }),
    check("add1", "address1 length should be 6 to 45 characters").isLength({
      min: 6,
      max: 45,
    }),
    check("add2", "address2 length should be 6 to 45 characters").isLength({
      min: 6,
      max: 45,
    }),
  ],
  (req: Request, res: Response) => {
    let id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render("forminu/home", {
        alert,
      });
    }
    let jsondata = req.body;

    let fname: string = req.body.fname;
    let lname: string = req.body.lname;
    let designation: string = req.body.designa;
    let email: string = req.body.email;
    let phone: string = req.body.number;
    let gender: string = req.body.gender;
    let rel_status: string = req.body.relstatus;
    let address1: string = req.body.add1;
    let address2: string = req.body.add2;
    let city: string = req.body.city;
    let state: string = req.body.state;
    let zipcode: string = req.body.zipcode;
    let bd: string = req.body.dob;

    let edu: string[] = ["ssc", "hsc", "bachelor", "master"];

    let lan1: string[] = ["", "", ""];
    let lan2: string[] = ["", "", ""];
    let lan3: string[] = ["", "", ""];

    lan1[1] = req.body.lan1;
    if (req.body.able1) {
      lan1[2] = req.body.able1.toString();
    }

    lan2[1] = req.body.lan2;
    if (req.body.able2) {
      lan2[2] = req.body.able2.toString();
    }
    lan3[1] = req.body.lan3;
    if (req.body.able3) {
      lan3[2] = req.body.able3.toString();
    }

    let tech1: string[] = ["", "", ""];
    let tech2: string[] = ["", "", ""];
    let tech3: string[] = ["", "", ""];
    let tech4: string[] = ["", "", ""];

    tech1[1] = req.body.tech1;
    tech1[2] = req.body.level1;

    tech2[1] = req.body.tech2;
    tech2[2] = req.body.level2;

    tech3[1] = req.body.tech3;
    tech3[2] = req.body.level3;

    tech4[1] = req.body.tech4;
    tech4[2] = req.body.level4;

    let ref1: string[] = ["", "", "", ""];
    let ref2: string[] = ["", "", "", ""];
    let ref3: string[] = ["", "", "", ""];

    ref1[1] = req.body.name1;
    ref1[2] = req.body.mobileno1;
    ref1[3] = req.body.rel1;

    ref2[1] = req.body.name2;
    ref2[2] = req.body.mobileno2;
    ref2[3] = req.body.rel2;

    ref3[1] = req.body.name3;
    ref3[2] = req.body.mobileno3;
    ref3[3] = req.body.rel3;

    let pre: string[] = ["", "", "", "", "", ""];

    pre[1] = req.body.preloc;
    pre[2] = req.body.notice;
    pre[3] = req.body.exctc;
    pre[4] = req.body.curctc;
    pre[5] = req.body.depa;

    let q = `INSERT INTO emp_details(fname, lname, designation, email, phone, gender, rel_status, address1, address2, city, state, zipcode, bd) VALUES ("${fname}", "${lname}", "${designation}", "${email}", "${phone}", "${gender}", "${rel_status}", "${address1}", "${address2}", "${city}", "${state}", "${zipcode}", "${bd}")`;

    con.query(q, (err: any | null, result: RowDataPacket) => {
      if (err) throw err;

      id = result.insertId;

      let len = req.body.board_name;
      for (let i = 0; i < len.length; i++) {
        let q1 = `INSERT INTO edu_detail(emp_id, type_of_result, Name_of_board_or_course, Passing_year, Percentage) VALUES ('${id}', '${edu[i]}', '${req.body.board_name[i]}', '${req.body.py[i]}', '${req.body.percentage[i]}')`;
        if (req.body.board_name[i]) {
          con.query(q1, (err, result1) => {
            if (err) throw err;
          });
        }
      }

      let wklen = req.body.companyname;
      for (let i = 0; i < wklen.length; i++) {
        let q2 = `INSERT INTO work_experience(emp_id, company_name, designation, from_date, to_date) VALUES ('${id}', '${req.body.companyname[i]}', '${req.body.designation[i]}', '${req.body.from[i]}', '${req.body.to[i]}')`;
        if (req.body.companyname[i]) {
          con.query(q2, (err, result1) => {
            if (err) throw err;
          });
        }
      }

      let q3 = `INSERT INTO language(emp_id, language_know, rws) VALUES (?)`;

      if (req.body.lan1) {
        lan1[0] = id;
        con.query(q3, [lan1], (err, result) => {
          if (err) throw err;
        });
      }
      if (req.body.lan2) {
        lan2[0] = id;
        con.query(q3, [lan2], (err, result) => {
          if (err) throw err;
        });
      }
      if (req.body.lan3) {
        lan3[0] = id;
        con.query(q3, [lan3], (err, result) => {
          if (err) throw err;
        });
      }

      let q4 = `INSERT INTO know_techno(emp_id, tech_know, level_of_technology) VALUES (?)`;
      tech1[0] = id;
      if (req.body.tech1) {
        con.query(q4, [tech1], (err, result) => {
          if (err) throw err;
        });
      }
      tech2[0] = id;
      if (req.body.tech2) {
        con.query(q4, [tech2], (err, result) => {
          if (err) throw err;
        });
      }
      tech3[0] = id;
      if (req.body.tech3) {
        con.query(q4, [tech3], (err, result) => {
          if (err) throw err;
        });
      }
      tech4[0] = id;
      if (req.body.tech4) {
        con.query(q4, [tech4], (err, result) => {
          if (err) throw err;
        });
      }

      //section ref
      let reflen = req.body.name;
      for (let i = 0; i < reflen.length; i++) {
        let q5 = `INSERT INTO reference_contact(emp_id, name, contact_number, relation) VALUES ('${id}', '${req.body.name[i]}', '${req.body.mobileno[i]}', '${req.body.rel[i]}')`;
        if (req.body.name[i]) {
          con.query(q5, (err, result1) => {
            if (err) throw err;
          });
        }
      }
      //section ended

      let q6 = `INSERT INTO preferences(emp_id, prefered_location, notice_period, expected_ctc, current_ctc, department) VALUES (?)`;
      pre[0] = id;
      con.query(q6, [pre], (err, result) => {
        if (err) throw err;
      });

      res.render("forminu/fetchuser");
    });
  }
);

route.get("/alluser", checkAuth, (req: Request, res: Response) => {
  res.render("forminu/fetchuser");
});
route.get(
  "/normalupdate/:id",
  checkAuth,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (id) {
      const query = (str: string) => {
        return new Promise<any[]>((resolve, reject) => {
          con.query(str, (err: any | null, result: Array<RowDataPacket>) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      };

      try {
        const count = await query(
          `select count(*) as lt from edu_detail where emp_id=${id};`
        );

        if (count[0].lt >= 1) {
          const result = await query(
            `select * from emp_details where emp_id=${id};`
          );

          const queries = [
            `select * from edu_detail where emp_id=${id};`,
            `select * from work_experience where emp_id=${id};`,
            `select * from language where emp_id=${id};`,
            `select * from know_techno where emp_id=${id};`,
            `select * from reference_contact where emp_id=${id};`,
            `select * from preferences where emp_id=${id};`,
          ];

          const [result1, result2, result3, result4, result5, result6] =
            await Promise.all(queries.map(query));

          const tech = result4.map((item: any) => item.tech_know);
          const techlevel = result4.map(
            (item: any) => item.tech_know + item.level_of_technology
          );
          const lan = result3.map((item: any) => item.language_know);

          const arr1 =
            result3
              .find((item: any) => item.language_know === "hindi")
              ?.rws.split(",") || [];
          const arr2 =
            result3
              .find((item: any) => item.language_know === "english")
              ?.rws.split(",") || [];
          const arr3 =
            result3
              .find((item: any) => item.language_know === "gujarati")
              ?.rws.split(",") || [];

          res.render("forminu/update", {
            id,
            result,
            result1,
            result2,
            result3,
            result4,
            tech,
            techlevel,
            lan,
            arr1,
            arr2,
            arr3,
            result5,
            result6,
          });
        }
      } catch (err) {
        console.error(err);
        // Handle error response
      }
    }
  }
);

route.post(
  "/normalupdate/:id",
  urlencodedParser,
  [
    check("fname", "This username must me 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    check("lname", "This lastname must me 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    check("designa", "This designation must me 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    check("dob", "Enter date-of-birth in yyyy-mm-dd formate").isDate(),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
    // check("number", "Please enter valid Mobile Number").isMobilePhone(),
    check("zipcode", "zipcode length should be 6 characters").isLength({
      min: 6,
      max: 6,
    }),
    check("add1", "address1 length should be 6 to 45 characters").isLength({
      min: 6,
      max: 45,
    }),
    check("add2", "address2 length should be 6 to 45 characters").isLength({
      min: 6,
      max: 45,
    }),
  ],
  async (req: Request, res: Response) => {
    let id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      return res.render("forminu/home", {
        alert,
      });
    }
    let jsondata: FormData = req.body;

    if (req.params.id) {
      let query = (str: string) => {
        return new Promise((resolve, reject) => {
          con.query(str, (err, result) => {
            if (err) throw err;
            else {
              resolve(result);
            }
          });
        });
      };
      // =========section1===============
      const {
        fname,
        lname,
        designation,
        email,
        phone,
        gender,
        rel_status,
        address1,
        address2,
        city,
        state,
        zipcode,
        bd,
        
      } = jsondata;
      let emp_detail = await query(
        `UPDATE emp_details
          SET fname='${fname}', lname='${lname}',designation='${designation}',email='${email}',phone='${phone}',gender='${gender}',
          rel_status='${rel_status}',address1='${address1}',address2='${address2}',city='${city}',
          state='${state}',zipcode='${zipcode}',bd='${bd}'
          WHERE emp_id='${id}';`
      );

      //==========section2=============
      let edu = ["ssc", "hsc", "bachelor", "master"];
      let len = req.body.board_name;
      let arr6 = await query(
        `select edu_id as edu_id from edu_detail where emp_id in(${id});`
      )as Array<RowDataPacket>;
      for (let i = 0; i < len.length; i++) {
        if (arr6[i]) {
          let edu_detail = await query(`UPDATE edu_detail
          SET Name_of_board_or_course='${req.body.board_name[i]}',Passing_year='${req.body.py[i]}',Percentage='${req.body.percentage[i]}'
          WHERE emp_id='${id}' and type_of_result='${edu[i]}' and edu_id='${arr6[i].edu_id}';`);
        } else {
          if (len[i]) {
            let inser_edu = await query(`insert into edu_detail( emp_id,
              type_of_result,
              Name_of_board_or_course,
              Passing_year,
              Percentage) values('${id}','${edu[i]}','${req.body.board_name[i]}','${req.body.py[i]}','${req.body.percentage[i]}');`);
          }
        }
      }
      //============section3============
      let arr = await query(
        `select id as work_id from emp.work_experience where emp_id in(${id});`
      )as Array<RowDataPacket>;;

      let wklen = req.body.companyname;
      for (let i = 0; i < wklen.length; i++) {
        if (arr[i]) {
          let work_exp = await query(`UPDATE work_experience
              SET company_name='${req.body.companyname[i]}',designation='${req.body.designation[i]}',from_date='${req.body.from[i]}',to_date='${req.body.to[i]}'
              WHERE emp_id='${id}' and id='${arr[i].work_id}';`)as Array<ResultSetHeader>;;
        } else {
          if (wklen[i]) {
            let work_ins = await query(`insert into work_experience( emp_id,
            company_name ,designation ,from_date, to_date) values('${id}','${req.body.companyname[i]}','${req.body.designation[i]}','${req.body.from[i]}','${req.body.to[i]}');`);
          }
        }
      }

      //language

      let languagearr = [];
      let rwsarr = [];
      if (req.body.lan1) {
        languagearr.push(req.body.lan1);
        rwsarr.push(req.body.able1);
      }
      if (req.body.lan2) {
        languagearr.push(req.body.lan2);
        rwsarr.push(req.body.able2);
      }
      if (req.body.lan3) {
        languagearr.push(req.body.lan3);
        rwsarr.push(req.body.able3);
      }
      let del = await query(`delete from language where emp_id='${id}';`);
      for (let i = 0; i < languagearr.length; i++) {
        let lan_edit = await query(`insert into language(emp_id ,
              language_know,
             rws) values('${id}','${languagearr[i]}','${rwsarr[i]}')`);
      }

      let tech = [];
      let level = [];
      if (req.body.tech1) {
        tech.push(req.body.tech1);
        level.push(req.body.level1);
      }
      if (req.body.tech2) {
        tech.push(req.body.tech2);
        level.push(req.body.level2);
      }
      if (req.body.tech3) {
        tech.push(req.body.tech3);
        level.push(req.body.level3);
      }
      if (req.body.tech4) {
        tech.push(req.body.tech4);
        level.push(req.body.level4);
      }
      let arr5 = await query(
        `select id as tech_id from emp.know_techno where emp_id in(${id});`
      )as Array<RowDataPacket>;;

      for (let i = 0; i < tech.length; i++) {
        if (arr5[i]) {
          let tech_edit = await query(`UPDATE know_techno set
                   tech_know='${tech[i]}',
                   level_of_technology= '${level[i]}'
                    where emp_id='${id}' and id='${arr5[i].tech_id}';`);
        } else {
          if (tech[i]) {
            let insert_tech = await query(
              `insert into know_techno(emp_id,tech_know ,level_of_technology) values('${id}','${tech[i]}','${level[i]}')`
            );
          }
        }
      }
      //section ref
      let arr2 = await query(
        `select ref_id as ref_id from reference_contact where emp_id in(${id});`
      )as Array<RowDataPacket>;;
      let reflen = req.body.name;
      for (let i = 0; i < reflen.length; i++) {
        if (arr2[i]) {
          let work_exep = await query(`UPDATE reference_contact
            SET name='${req.body.name[i]}',contact_number='${req.body.mobileno[i]}',relation='${req.body.rel[i]}'
            WHERE emp_id='${id}' and ref_id='${arr2[i].ref_id}';`);
        } else {
          if (reflen[i]) {
            let ins_workexp =
              await query(`insert into reference_contact(emp_id, name ,
              contact_number ,relation) values('${id}','${req.body.name[i]}','${req.body.mobileno[i]}','${req.body.rel[i]}');`);
          }
        }
      }

      //section ended
      let pref = await query(
        `UPDATE preferences
        SET prefered_location='${req.body.preloc}', notice_period='${req.body.notice}',expected_ctc='${req.body.exctc}',current_ctc='${req.body.curctc}',department='${req.body.depa}'
        WHERE emp_id='${id}';`
      );
      //end
    }
    res.send(`data is succesfully updated `);
  }
);

export default route;
