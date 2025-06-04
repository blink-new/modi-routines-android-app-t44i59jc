import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Settings, Wifi, Bluetooth, Bell, Info } from 'lucide-react-native';
import * as Linking from 'expo-linking';

export default function SettingsScreen() {

  const openSettings = (url: string) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View 
        style={styles.header}
        entering={FadeInDown.duration(400)}
      >
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>
          Access device settings related to the app.
        </Text>
      </Animated.View>

      {/* General Settings */}
      <Animated.View 
        style={styles.section}
        entering={FadeInDown.duration(400).delay(100)}
      >
        <Text style={styles.sectionTitle}>Device Settings</Text>
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => openSettings('app-settings:')}
        >
          <View style={styles.settingLeft}>
            <Info size={20} color="#7F8C8D" />
            <Text style={styles.settingLabel}>App Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.settingItem, styles.settingItemBorder]}
          onPress={() => openSettings('android.settings.WIFI_SETTINGS')}
        >
          <View style={styles.settingLeft}>
            <Wifi size={20} color="#7F8C8D" />
            <Text style={styles.settingLabel}>Wi-Fi Settings</Text>
          </View>
        </TouchableOpacity>
         <TouchableOpacity 
          style={[styles.settingItem, styles.settingItemBorder]}
          onPress={() => openSettings('android.settings.BLUETOOTH_SETTINGS')}
        >
          <View style={styles.settingLeft}>
            <Bluetooth size={20} color="#7F8C8D" />
            <Text style={styles.settingLabel}>Bluetooth Settings</Text>
          </View>
        </TouchableOpacity>
         <TouchableOpacity 
          style={[styles.settingItem, styles.settingItemBorder]}
          onPress={() => openSettings('android.settings.ACTION_NOTIFICATION_SETTINGS')}
        >
          <View style={styles.settingLeft}>
            <Bell size={20} color="#7F8C8D" />
            <Text style={styles.settingLabel}>Notification Settings</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Add more sections or settings buttons as needed */}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 22,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingItemBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#2C3E50',
  },
});