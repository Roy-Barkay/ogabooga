export default function filter(inputs, data) {
  if (inputs.length === 0) return data;
  let localData = data;
  inputs.forEach((input) => {
    let checkedInputs = input.options.filter((o) => o.checked);
    if (checkedInputs.length > 1) {
      let filteredOptions = [];
      checkedInputs.forEach((option) => {
        let optionResults = localData.filter(
          (x) => x[input.field].id === option.id
        );
        filteredOptions = filteredOptions.concat(optionResults);
      });
      localData = filteredOptions;
    } else {
      checkedInputs.forEach((option) => {
        localData = localData.filter((x) => x[input.field].id === option.id);
      });
    }
  });

  return localData;
}
