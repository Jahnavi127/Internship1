import { FlatList, StyleSheet, Text, View, Button, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SearchBar } from 'react-native-elements';
// import {Icon} from 'react-native-vector-icons';

export default function Profile({navigation}) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search,setSearch]=useState('');
    const [filter,setFilter]=useState(false);
    const [fun,setFun]=useState(false)
    let [start,setStart]=useState(0);
    let [end,setEnd]=useState(0);
    const itemsPerPage = 20;

  
    useEffect(() => {
      fetchData();
    }, [currentPage,start,end]);

    // console.log(fun);
    const fetchData = () => {
      if(!fun){

        start = (currentPage - 1) * itemsPerPage;
        end = start + itemsPerPage;
      }
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => setData(json.slice(start, end)));
    };
    
    let filteredData  =  data.filter((item)=>{
       return (item.username.toLowerCase().includes(search.toLowerCase())
              || item.email.toLowerCase().includes(search.toLowerCase())
              || item.phone.toLowerCase().includes(search.toLowerCase())
              || item.name.toLowerCase().includes(search.toLowerCase())
              || item.website.toLowerCase().includes(search.toLowerCase())
          );
    });


    // let filteredDataByEmail = data.filter(
    //   (item)=>{
    //     return item.email.toLowerCase().includes(search.toLowerCase());
    //   }
    // );
    
    // filteredData=[...filteredDataByEmail,...filteredData]

    // function merge(a, b, prop) {
    //   var reduced = a.filter(aitem => !b.find(bitem => aitem[prop] === bitem[prop]))
    //   return reduced.concat(b);
    // }
    // filteredData=merge(filteredData, filteredDataByEmail, "id");

    //Printing of data
    // console.log(filteredData);
    // (filteredData).forEach(element => {
    //   console.log(element.username,element.email);
    // });
    

    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    return (
      <View style={{ backgroundColor: '#f0f0f2', flex: 1 }}>
        <View>
          <Modal
             animationType='fade'
             transparent={true}
             visible={filter}
             onRequestClose={() => {
              // Alert.alert('Modal has been closed.');
              setFilter(!filter);
            }}
          >           
            <View style={{
              flex:1,alignItems:'center',justifyContent:'center',borderWidth:1}}>           
            <View style={{borderRadius:20,backgroundColor:'white',width:300,height:200,flexDirection:'column',margin:10,padding:10,borderWidth:2}}>
             <View style={{flexDirection:'row',top:30,alignItems:'center',justifyContent:'center',justifyContent:'space-evenly',padding:10}}>
              <View>
                <Text style={{color:'black'}}>Range </Text>
              </View> 
              <View style={{margin:10,justifyContent:'space-evenly'}}>
                <Text style={{color:'black'}}>Start:</Text>
                <TextInput onChangeText={(e)=>setStart(e)} style={{backgroundColor:'white',left:-3,borderWidth:1,height:40,borderRadius:9}} placeholder='enter here..'/>
              </View>
              <View>
                <Text style={{color:'black'}}>End:</Text>
                <TextInput onChangeText={(e)=>setEnd(e)} style={{backgroundColor:'white',left:-3,borderWidth:1,height:40,borderRadius:9}} placeholder='enter here..'/>
              </View>
              </View> 
              <TouchableOpacity onPress={()=>setFilter(false)}>
                <View style={{top:30,alignItems:'center'}}>
                   <Text style={{borderWidth:1,color:'white',backgroundColor:'#c549f2',borderRadius:9}}>  Filter  </Text>
                </View>
              </TouchableOpacity>
            </View>
            </View>
          
          </Modal>
        </View>
        <View style={{flexDirection:'row'}}>  
        <SearchBar
        placeholder="Search"
        onChangeText={text => setSearch(text)}
        value={search}
        containerStyle={{color:'#f0f0f2',backgroundColor:'#f0f0f2',borderColor:'#f0f0f2',width:300}}
        inputContainerStyle={{color:'black',backgroundColor:'white',borderRadius:38,borderWidth:1,borderColor:'black'}}
        searchIcon={<Image
          style={{ width: 20, height: 20 }}
          source={require('./pic2.png')}
          />}
        rightIcon={
          <Image
          style={{ width: 20, height: 20 }}
          source={require('./pic3.png')}
          />}
        cancelIcon={<Image
          style={{ width: 20, height: 20 }}
          source={require('./pic3.png')}
          />}
        />
        <TouchableOpacity onPress={()=>{
          setFilter(!filter);
          setFun(true)
        }}>
          <View style={styles.filter}>
            <Text style={{color:'white',}}>Filter</Text>
          </View>
        </TouchableOpacity>
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flex: 1,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 2,
              margin: 10, 
              paddingTop: 3, 
              borderRadius: 18, 
              backgroundColor: 'white' 
            }}>
              <View style={styles.box}>
                <View style={styles.round}>
                    <Image style={{ width: 50, height: 50,borderRadius:50 }}
                       source={require('./img.png')}/>
                  {/* <Text style={{ color: 'black', fontWeight: 'bold', backgroundColor: '#e9d7f7' }}>{item.id}</Text> */}
                </View>
                <View style={{ flex: 8 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 10, height: 10, borderWidth: 1, borderRadius: 100, top: 10, left: -5,marginBottom:0, backgroundColor: '#e63274' }}></View>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                  </View>
                  <Text style={{ color: '#cd9df5', marginLeft: 5 }}>{item.username}</Text>
                  <Text style={{ color: '#cd9df5', marginLeft: 5 }}>{item.phone}</Text>
                  <Text style={{ color: '#cd9df5', marginLeft: 5 }}>{item.website}</Text>
                  <Text style={{ color: '#cd9df5', marginLeft: 5 }}>{item.email}</Text>
                </View>
              </View>
            </View>
          )}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 16, paddingBottom: 16 }}>
          <Button title="<" onPress={handlePrevPage} disabled={currentPage === 1} />
          <Text style={{color:'black',top:8}}>  You are on page {currentPage}  </Text>
          <Button title=">" onPress={handleNextPage} disabled={data.length === 0} />
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
    box: {
      flex: 1,
      flexDirection: 'row',
      margin: 5,
      padding: 5,
    },
    round: {
      flex: 1,
      borderRadius: 50,
      alignSelf: 'center',
      margin:8,
      paddingRight:8
    },
    filter:{
      top:14,
      width:100,
      borderWidth:1,
      height:40,
      justifyContent:'center',
      alignSelf:'center',
      alignItems:'center',
      borderRadius:5,
      backgroundColor:'#c549f2'
    }
  });


  // {"address": 
  //    {"city": "Gwenborough", "geo": {"lat": "-37.3159", "lng": "81.1496"}, "street": "Kulas Light", "suite": "Apt. 556", "zipcode": "92998-3874"}, 
  //    "company": {"bs": "harness real-time e-markets", "catchPhrase": "Multi-layered client-server neural-net", "name": "Romaguera-Crona"},
  //     "email": "Sincere@april.biz", "id": 1, "name": "Leanne Graham", "phone": "1-770-736-8031 x56442", 
  //     "username": "Bret", "website": "hildegard.org"}