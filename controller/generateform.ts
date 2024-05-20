import * as express from "express";
let route = express.Router();
import { Request, Response } from "express";
import checkAuth from "../middlewares/checkauth";
import con from "../models/database";
import parser from "body-parser";
route.use(parser.json());
route.use(parser.urlencoded({ extended: false }));

route.get("/geneform", checkAuth, (req: Request, res: Response) => {
  res.render("generateform/home");
});

route.post("/geneform", (req: Request, res: Response) => {
  let jsonData = req.body;

  let search = jsonData.query;
  let type = jsonData.type;

  let q = `select selection_master.sel_id,selection_master.type,option_master.op_name from selection_master
    join option_master on selection_master.sel_id=option_master.sel_id 
   where selection_master.sel_name="${search}";`;
  con.query(q, (err, result) => {
    if (err) throw err;

    res.render("generateform/data.ejs", { users: result, search, type });
  });
});

export default route;