import * as dbUtil from './databaseUtil';

export const generate = async (type) => {
    const sql = 'SELECT id,type,type_name,current_value FROM serial_number WHERE type = ? LIMIT 1';
    const sqlResult = await dbUtil.queryOne(sql, [type]);
    var date = new Date();
    const currentYear = date.getFullYear().toString().substring(2, 4);
    var currentMonth = date.getMonth() + 1;
    if (currentMonth < 10) currentMonth = `0${currentMonth}`
    const prefixResultVal = parseInt(`${currentYear}${currentMonth}0000`);
    const newValue = sqlResult.current_value + 1;

    const updateSql = 'UPDATE serial_number SET current_value = ? WHERE type = ?';
    await dbUtil.query(updateSql, [parseInt(newValue), type]);

    const result = `${prefixResultVal + newValue}`;
    return result;
};