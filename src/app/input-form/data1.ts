export default interface Data1 {
  name: string;
}


export class DataType {
  data = {
    name: {
      type: 'string',
      inputType: 'text'
    },
    approval: {
      type: 'boolean',
      inputType: 'radio',
      values: [true, false]
    }
  }
}
