import { FlatList, StyleSheet, Text, View, Button, Image, TouchableOpacity, Modal, TextInput, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SearchBar } from 'react-native-elements';

export default function Home({ navigation }) {
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

  const fetchData = () => {
    if(!fun){

      start = (currentPage - 1) * itemsPerPage;
      end = start + itemsPerPage;
    }

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setData(json.slice(start, end)));
  };

  let filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase())
      || item.body.toLowerCase().includes(search.toLowerCase())
  });

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
              </View>
              {/* <View style={styles.round}>
                <Text style={{ color: 'black', fontWeight: 'bold', backgroundColor: '#e9d7f7' }}>{item.id}</Text>
              </View> */}
              <View style={{ flex: 8 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 10, height: 10, borderWidth: 1, borderRadius: 100, top: 10, left: -5, backgroundColor: '#e63274' }}></View>
                  <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
                </View>
                <Text style={{ color: '#cd9df5', marginLeft: 5 }}>{item.body}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 16, paddingBottom: 16 }}>
        <Button title="<" onPress={handlePrevPage} disabled={currentPage === 1} />
        <Text style={{ color: 'black', top: 8 }}>  You are on page {currentPage}  </Text>
        <Button title=">" onPress={handleNextPage} disabled={data.length === 0} />
      </View>
      {/* <Button title='Next page' onPress={()=>navigation.navigate('Profile')}/> */}
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