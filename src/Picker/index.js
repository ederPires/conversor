import {Picker} from '@react-native-picker/picker'

export function PickerItem(props) {
//return <Picker.Item key={index} label={item.nomeMoeda} value={item.valorMoeda} />;
  //Busca o item na api
  let moedasItem = props.moedas.map( (item, index) => {
    return <Picker.Item key={index} label={item.key} value={item.key} />;
  } )
  return (
    <Picker
      selectedValue={props.moedaSelecionada}
        //onValueChange={(valor)=> console.log(valor) }>
      onValueChange={(valor)=> props.onChange(valor) }>
      {moedasItem}
    </Picker>
      // <Picker.Item value="BTC" key={0} label="BTC" />
  )
}
