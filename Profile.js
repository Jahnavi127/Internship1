import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function Profile({navigation}) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
  
    useEffect(() => {
      fetchData();
    }, [currentPage]);
  
    const fetchData = () => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
  
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => setData(json.slice(start, end)));
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flex: 1, borderWidth: 1, margin: 8, paddingTop: 3, borderRadius: 18, backgroundColor: 'white' }}>
              <View style={styles.box}>
                <View style={styles.round}>
                  <Text style={{ color: 'black', fontWeight: 'bold', backgroundColor: '#e9d7f7' }}>{item.id}</Text>
                </View>
                <View style={{ flex: 8 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 10, height: 10, borderWidth: 1, borderRadius: 100, top: 10, left: -5,marginBottom:0, backgroundColor: '#e63274' }}></View>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                  </View>
                  <Text style={{ color: '#cd9df5', marginLeft: 5 }}>{item.usename}</Text>
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
      borderWidth: 2,
      width: 50,
      marginRight: 4,
      padding: 5,
      height: 50,
      borderRadius: 50,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e9d7f7',
      borderColor: '#2f0d4a',
    },
  });