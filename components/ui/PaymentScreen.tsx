import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface PaymentProps {
  route: {
    params: {
      order: {
        itemName: string;
        qty: number;
        price: number;
        sugar: string;
        ice: string;
        image: string; // tambahkan property image
      }[];
    };
  };
}

export default function PaymentScreen({ route }: PaymentProps) {
  const { order } = route.params;

  const total = order.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Payment</Text>

      {order.map((item, idx) => (
        <View key={idx} style={styles.orderItem}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.itemText}>
            <Text style={styles.itemName}>{item.itemName}</Text>
            <Text style={styles.itemDetail}>Qty: {item.qty}</Text>
            <Text style={styles.itemDetail}>Gula: {item.sugar}</Text>
            <Text style={styles.itemDetail}>Es: {item.ice}</Text>
            <Text style={styles.subtotal}>Subtotal: Rp{(item.price * item.qty).toLocaleString()}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.total}>Total: Rp{total.toLocaleString()}</Text>

      <View style={styles.qrContainer}>
        <QRCode value={`PAYMENT-${total}`} size={200} />
      </View>

      <TouchableOpacity style={styles.finishBtn} onPress={() => alert('Pesanan selesai!')}>
        <Text style={styles.finishText}>Selesai</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdf6f0',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4b3f2f',
    marginBottom: 25,
  },
  orderItem: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 4,
    color: '#4b3f2f',
  },
  itemDetail: {
    fontSize: 14,
    color: '#7d6c5a',
  },
  subtotal: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8b5e3c',
    marginTop: 5,
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8b5e3c',
    marginVertical: 25,
  },
  qrContainer: {
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  finishBtn: {
    backgroundColor: '#d9854a',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 40,
  },
  finishText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
