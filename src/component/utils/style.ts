export const returnStyle = (
  array: Array<String | boolean | undefined>,
  style?: any
) => {
  let resul = "";
  if (array && array.length) {
    for (let index = 0; index < array.length; index++) {
      resul =
        resul +
        " " +
        (style ? style[`${array[index]}`] ?? array[index] : array[index]);
    }
  }
  return resul;
};
