import { connection } from "../Config.js";

////////////save user data in SQL database//////////
export const saveuser = async (req, res) => {
  const { name, email, password } = req.body;
  var sql = `INSERT INTO customers (name, email,password) VALUES (?,?,?)`;
  await connection.query(sql, [name, email, password], (err, result) => {
    if (err) throw err;
    res.json({
      success: "ok",
      data: result,
    });
  });
};

export const Readuser = async (req, res) => {
  var sql = `SELECT * FROM customers`;
  await connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json({
      success: "ok",
      data: result,
    });
  });
};

export const Remove = async (req, res) => {
  const id = req.params.id;
  console.log("id:", id);
  var sql = `DELETE FROM customers WHERE id= ?`;
  await connection.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({
      success: "ok",
      message: "Remove successfully.......",
    });
  });
};

export const updateHandler = async (req, res) => {
  const { name, email, id } = req.body;
  const sql = "UPDATE `customers` SET `name`=?,`email`=? WHERE id=?";
  let value = [name, email, id];
  connection.query(sql, value, (err, result) => {
    if (err) throw err;
    res.json({
      success: "ok",
      message: "update successfully.......",
    });
  });
};
