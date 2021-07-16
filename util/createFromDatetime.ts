const createFromDateTime = (mysql_string: string): Date => {
  const t = mysql_string.split(/[- :]/);

  //when t[3], t[4] and t[5] are missing they defaults to zero
  const result = new Date(
    parseInt(t[0]),
    parseInt(t[1]) - 1,
    parseInt(t[2]),
    t[3] ? parseInt(t[3]) : 0,
    t[4] ? parseInt(t[4]) : 0,
    t[5] ? parseInt(t[5]) : 0
  );

  return result;
};

export default createFromDateTime;
