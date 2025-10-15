import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CoffeeItem {
  coffee_id: number;
  coffee_title: string;
  coffee_detail: string;
  coffee_thumbnails: string;
  coffee_poster: string;
  categories: string;
  price: number;
}

type RootStackParamList = {
  Home: undefined;
  'Menu Details': { item: CoffeeItem };
  Welcome: undefined;
};

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const [data, setData] = useState<CoffeeItem[]>([]);
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation<HomeScreenProp>();

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/cikalkautsar/Coffe-Shop/main/db_coffeshop.json')
      .then((response) => response.json())
      .then((hasil) => setData(hasil))
      .catch((error) => console.log('❌ Terjadi error:', error));
  }, []);

  return (
    <View style={styles.container}>
      {/* Konten utama */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Mavinmuffin Coffee Series</Text>

        {data.map((item) => (
          <View key={item.coffee_id} style={styles.slide}>
            <View style={styles.content}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Menu Details', { item })}
              >
                <Image source={{ uri: item.coffee_thumbnails }} style={styles.image} />
              </TouchableOpacity>

              <View style={styles.textBox}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Menu Details', { item })}
                >
                  <Text style={styles.series}>{item.categories.toUpperCase()}</Text>
                  <Text style={styles.title}>{item.coffee_title}</Text>
                </TouchableOpacity>
                <Text style={styles.detail}>{item.coffee_detail}</Text>
                <Text style={styles.price}>Rp{item.price.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Beri spacing bawah supaya footer tidak menutupi konten */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer sticky */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Mavinmuffin Cafe</Text>
        <Text style={styles.footerText}>Jl. Setiabudi no 131</Text>
        <Text style={styles.footerText}>Telp: 0895-3801-89842</Text>
        <Text style={styles.footerText}>Instagram: @mavinmuffin.cafe</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f8f6',
  },
  scrollContent: {
    paddingTop: 30,
    paddingBottom: 0,
  },
  header: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#544338ff',
    marginBottom: 15,
  },
  slide: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 230,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  textBox: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  series: {
    color: '#9c806dff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2f2f2f',
    marginBottom: 6,
  },
  detail: {
    fontSize: 15,
    color: '#555',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#9c806dff',
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#5b4916ff',
    paddingVertical: 15,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffffff',
    marginBottom: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#ffffffff',
  },
});
