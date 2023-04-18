export const SQLs = {
  insertInto: (table: string) => `INSERT INTO ${table} SET ?`,
  getAllBy: (table: string, field: string) => `SELECT * FROM ${table} WHERE ${field} = ?`,
  deleteAllBy: (table: string, field: string) => `DELETE FROM ${table} WHERE ${field} = ?`,
  updateBy: (table: string, field: string, where: string) => `UPDATE ${table} SET ${field} = ? WHERE ${where} = ?`
}
