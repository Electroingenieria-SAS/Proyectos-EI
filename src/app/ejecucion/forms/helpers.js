export function rowUpdate(data, key, index, field, value, setData) {
  setData({ ...data, [key]: data[key].map((row, i) => i === index ? { ...row, [field]: value } : row) });
}

export function deleteRow(data, key, index, setData) {
  setData({ ...data, [key]: data[key].filter((_, i) => i !== index) });
}
