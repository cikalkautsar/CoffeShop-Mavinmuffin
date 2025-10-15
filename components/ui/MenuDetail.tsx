import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CoffeeItem {
  coffee_id: number;
  coffee_title: string;
  coffee_detail: string;
  coffee_thumbnails: string;
  coffee_poster: string;
  categories: string;
  price: number;
}

interface MenuDetailProps {
  route: { params: { item: CoffeeItem } };
  navigation: any;
}

export default function MenuDetailScreen({ route, navigation }: MenuDetailProps) {
  const { item } = route.params;

  const [gula, setGula] = useState('50%');
  const [es, setEs] = useState('Normal');
  const [jumlah, setJumlah] = useState(1);

  const totalPrice = item.price * jumlah;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.coffee_poster }} style={styles.image} />

      <View style={styles.textBox}>
        <Text style={styles.title}>{item.coffee_title}</Text>
        <Text style={styles.detail}>{item.coffee_detail}</Text>
        <Text style={styles.price}>Rp{totalPrice.toLocaleString()}</Text>
      </View>

      <View style={styles.optionBox}>
        <Text style={styles.optionLabel}>Pilih Gula</Text>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerText}>{gula}</Text>
          <View style={styles.pickerOptions}>
            {['0%', '25%', '50%', '75%', '100%'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.optionButton, gula === option && styles.selectedOption]}
                onPress={() => setGula(option)}
              >
                <Text style={[styles.optionButtonText, gula === option && styles.selectedOptionText]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.optionBox}>
        <Text style={styles.optionLabel}>Pilih Es</Text>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerText}>{es}</Text>
          <View style={styles.pickerOptions}>
            {['Tanpa Es', 'Normal', 'Extra Ice'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.optionButton, es === option && styles.selectedOption]}
                onPress={() => setEs(option)}
              >
                <Text style={[styles.optionButtonText, es === option && styles.selectedOptionText]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.optionBox}>
        <Text style={styles.optionLabel}>Jumlah</Text>
        <View style={styles.counterBox}>
          <TouchableOpacity
            style={styles.counterBtn}
            onPress={() => setJumlah(jumlah > 1 ? jumlah - 1 : 1)}
          >
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterNumber}>{jumlah}</Text>
          <TouchableOpacity
            style={styles.counterBtn}
            onPress={() => setJumlah(jumlah + 1)}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

        <TouchableOpacity 
          style={styles.orderBtn}
          onPress={() => navigation.navigate('PaymentScreen', { 
            order: [{
              itemName: item.coffee_title,
              qty: jumlah,
              price: item.price,
              sugar: gula,
              ice: es,
              image: item.coffee_thumbnails
            }]
          })}
        >
          <Text style={styles.orderText}>Tambah ke Pesanan</Text>
        </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f8f6',
    padding: 15,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 15,
  },
  textBox: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f2f2f',
    marginBottom: 6,
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#643a00ff',
    fontWeight: '700',
  },
  optionBox: {
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterBtn: {
    backgroundColor: '#644600ff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  counterText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  counterNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  orderBtn: {
    backgroundColor: '#644600ff',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  orderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  pickerText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  pickerOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 2,
  },
  selectedOption: {
    backgroundColor: '#644600ff',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
  },
});
