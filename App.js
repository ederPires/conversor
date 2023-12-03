//Hooks
import React, {useState, useEffect} from 'react'
import { Text, StyleSheet, View, ActivityIndicator, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import {PickerItem} from './src/Picker';
import {api} from './src/services/api';

//import PickerItem from './src/Picker'; com export defalt pega direto sem chaves

export default function App() {
  const [moedas, setMoedas] = useState([])
  const [loading, setLoading] = useState(true)
  const [moedaSelecionada, setMoedaSelecionada] = useState(null)

  const [moedaBValor, setMoedaBValor] = useState("")
  const [ValorMoeda, setValorMoeda] = useState(null)
  const [valorConvertido, setValorConvertido] = useState(0)


  //Quando monta o componente chama o useEffect
  useEffect(() => {
    async function loadMoedas(){
      //busca no site da api
      const response = await api.get("all")
      let arrayMoedas = [];
      //pega um objeto e não array
      //percorre o objeto e coloca no array
      Object.keys(response.data).map( (key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key,
        })
      } )

      setMoedas(arrayMoedas)
      setMoedaSelecionada(arrayMoedas[0].key)
      setLoading(false) //se der tudo certo loading será falso

      //console.log(response.data);
      //console.log("==================>")
      //console.log(arrayMoedas);
    }

    loadMoedas();
  }, [])

  async function converter () {
    if(moedaBValor === 0 || moedaBValor === "" || moedaSelecionada === null ){
      return;
    }

    const response = await api.get(`/all/${moedaSelecionada}-BRL`)

    console.log(response.data[moedaSelecionada].ask);

    //pega o valor digitado e multiplica pelo valor da moeda selecionada, consome da api
    let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor))

    //resultado final
    setValorConvertido(`${resultado.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}`)
    //valor digitado
    setValorMoeda(moedaBValor)

    //esconde o teclado
    Keyboard.dismiss();

    //console.log(response.data);
    //console.log(moedaBValor)
    //console.log("TESTE")
  }

    if(loading){
      return(
        <View style={{ flex:1, justifyContent: "center", alignItems: "center", backgroundColor: "#101215" } } >
          <ActivityIndicator size="large" color="#FFF"/>
        </View>
      )
    } else{
      return (
        <View style={styles.container}>
          <View style={styles.areaMoeda}>
            <Text style={styles.titulo}>Selecione sua moeda</Text>
            <PickerItem
              moedas={moedas} //seta valor de moedaSelecionada
              moedaSelecionada={moedaSelecionada}
              onChange={ (moeda) => {
                setMoedaSelecionada(moeda)
                //console.log(moeda);
              }}
            />
          </View>

          <View style={styles.areaValor}>
              <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
              <TextInput
                placeholder='"EX: 1.50'
                style={styles.input}
                keyboardType='numeric'
                value={moedaBValor}
                onChangeText={(valor) => setMoedaBValor(valor)}
              />
          </View>

          <TouchableOpacity style={styles.botaoArea} onPress={converter}>
            <Text style={styles.botaoText}>Converter</Text>
          </TouchableOpacity>

          {valorConvertido !== 0 && (
            <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>
              {ValorMoeda} {moedaSelecionada}
            </Text>

            <Text style={{fontSize: 18, margin: 8, color: "#000"}}>
              Corresponde a
            </Text>

            <Text style={styles.valorConvertido}>
              {valorConvertido}
            </Text>

          </View>
          )}

        </View>
      )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    paddingTop: 40,
    alignItems: 'center',
  },
  areaMoeda:{
    backgroundColor: "#f9f9f9",
    width: "90%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    marginBottom: 1
  },
  titulo:{
    fontSize: 16,
    color: "#000",
    fontWeight: '500',
    paddingLeft: 5,
    paddingTop: 5,
  },
  areaValor:{
    width: '90%',
    backgroundColor: "#f9f9f9",
    paddingTop: 8,
    paddingBottom: 8
  },
  input:{
    width: '100%',
    padding: 8,
    fontSize: 18,
    color: "#000"
  },
  botaoArea:{
    width: '90%',
    backgroundColor: "#fb4b57",
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  botaoText: {
    color: "#000",
    fontWeight: 'bold',
    fontSize: 16,
  },
  areaResultado:{
    width: '90%',
    backgroundColor: "#FFF",
    marginTop: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  valorConvertido:{
    fontSize: 28,
    color: "#000",
    fontWeight: 'bold'
  }
})
