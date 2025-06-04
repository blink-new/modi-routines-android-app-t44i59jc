import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { User, Mail, Bell, Moon, Shield, HelpCircle, LogOut, ChevronRight, Edit } from 'lucide-react-native';

export default function ProfileScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [privacy, setPrivacy] = React.useState(false);

  const profileSections = [
    {
      title: 'Account',
      items: [
        { icon: <User size={20} color="#7F8C8D" />, label: 'Edit Profile', onPress: () => {} },
        { icon: <Mail size={20} color="#7F8C8D" />, label: 'Email Preferences', onPress: () => {} },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { 
          icon: <Bell size={20} color="#7F8C8D" />, 
          label: 'Notifications', 
          hasSwitch: true,
          value: notifications,
          onValueChange: setNotifications
        },
        { 
          icon: <Moon size={20} color="#7F8C8D" />, 
          label: 'Dark Mode', 
          hasSwitch: true,
          value: darkMode,
          onValueChange: setDarkMode
        },
        { 
          icon: <Shield size={20} color="#7F8C8D" />, 
          label: 'Privacy Mode', 
          hasSwitch: true,
          value: privacy,
          onValueChange: setPrivacy
        },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: <HelpCircle size={20} color="#7F8C8D" />, label: 'Help & Support', onPress: () => {} },
        { icon: <LogOut size={20} color="#E74C3C" />, label: 'Sign Out', onPress: () => {}, isDestructive: true },
      ]
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <Animated.View 
        style={styles.profileHeader}
        entering={FadeInDown.duration(400)}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={50} color="#FFFFFF" />
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
            <Edit size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
        
        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>127</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>892</Text>
            <Text style={styles.statLabel}>Tasks Done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Rules Set</Text>
          </View>
        </View>
      </Animated.View>

      {/* Settings Sections */}
      <View style={styles.sectionsContainer}>
        {profileSections.map((section, sectionIndex) => (
          <Animated.View 
            key={section.title}
            entering={FadeInDown.duration(400).delay(100 + sectionIndex * 50)}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.settingItem,
                    index !== section.items.length - 1 && styles.settingItemBorder
                  ]}
                  onPress={item.hasSwitch ? undefined : item.onPress}
                  activeOpacity={item.hasSwitch ? 1 : 0.7}
                >
                  <View style={styles.settingLeft}>
                    {item.icon}
                    <Text style={[
                      styles.settingLabel,
                      item.isDestructive && styles.destructiveText
                    ]}>
                      {item.label}
                    </Text>
                  </View>
                  {item.hasSwitch ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{ false: '#E0E0E0', true: '#FF6B6B' }}
                      thumbColor="#FFFFFF"
                    />
                  ) : (
                    <ChevronRight size={20} color="#C7C7CC" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        ))}
      </View>

      {/* App Version */}
      <Animated.View 
        style={styles.footer}
        entering={FadeInDown.duration(400).delay(400)}
      >
        <Text style={styles.version}>Modi & Routines v1.0.0</Text>
        <Text style={styles.copyright}>© 2024 All rights reserved</Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  profileHeader: {
    backgroundColor: '#FF6B6B',
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2C3E50',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  sectionsContainer: {
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
    textTransform: 'uppercase',
    marginLeft: 20,
    marginBottom: 8,
    marginTop: 15,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
  destructiveText: {
    color: '#E74C3C',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  version: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  copyright: {
    fontSize: 12,
    color: '#BDC3C7',
    marginTop: 4,
  },
});