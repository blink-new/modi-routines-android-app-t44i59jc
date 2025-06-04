import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Shield, AlertCircle, Plus, X, Edit2, Trash2 } from 'lucide-react-native';

interface Rule {
  id: string;
  title: string;
  description: string;
  category: 'discipline' | 'productivity' | 'health';
  enabled: boolean;
}

export default function RulesScreen() {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      title: 'No Social Media Before Noon',
      description: 'Stay focused on your morning routine without distractions',
      category: 'productivity',
      enabled: true,
    },
    {
      id: '2',
      title: 'Exercise Every Day',
      description: 'Minimum 30 minutes of physical activity',
      category: 'health',
      enabled: true,
    },
    {
      id: '3',
      title: 'Read Before Bed',
      description: 'Replace screen time with reading for better sleep',
      category: 'discipline',
      enabled: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'discipline' as 'discipline' | 'productivity' | 'health',
  });

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const openAddModal = () => {
    setEditingRule(null);
    setFormData({ title: '', description: '', category: 'discipline' });
    setShowModal(true);
  };

  const openEditModal = (rule: Rule) => {
    setEditingRule(rule);
    setFormData({ 
      title: rule.title, 
      description: rule.description, 
      category: rule.category 
    });
    setShowModal(true);
  };

  const saveRule = () => {
    if (formData.title.trim()) {
      if (editingRule) {
        setRules(rules.map(rule => 
          rule.id === editingRule.id 
            ? { ...rule, ...formData }
            : rule
        ));
      } else {
        setRules([...rules, {
          id: Date.now().toString(),
          ...formData,
          enabled: true,
        }]);
      }
      setShowModal(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'discipline': return '#9B59B6';
      case 'productivity': return '#3498DB';
      case 'health': return '#2ECC71';
      default: return '#7F8C8D';
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconProps = { size: 16, color: '#FFFFFF' };
    switch (category) {
      case 'discipline': return <Shield {...iconProps} />;
      case 'productivity': return <AlertCircle {...iconProps} />;
      case 'health': return <Shield {...iconProps} />;
      default: return <Shield {...iconProps} />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          style={styles.header}
          entering={FadeInDown.duration(400)}
        >
          <Text style={styles.headerTitle}>Your Rules</Text>
          <Text style={styles.headerSubtitle}>
            Set boundaries and stick to them. These rules help you build better habits.
          </Text>
        </Animated.View>

        {/* Rules List */}
        <View style={styles.rulesContainer}>
          {rules.map((rule, index) => (
            <Animated.View
              key={rule.id}
              entering={FadeInDown.duration(400).delay(index * 50)}
            >
              <TouchableOpacity
                style={[styles.ruleCard, !rule.enabled && styles.ruleDisabled]}
                onPress={() => toggleRule(rule.id)}
                activeOpacity={0.7}
              >
                <View style={styles.ruleHeader}>
                  <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(rule.category) }]}>
                    {getCategoryIcon(rule.category)}
                    <Text style={styles.categoryText}>{rule.category}</Text>
                  </View>
                  <View style={styles.ruleActions}>
                    <TouchableOpacity 
                      onPress={() => openEditModal(rule)}
                      style={styles.actionButton}
                    >
                      <Edit2 size={18} color="#7F8C8D" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => deleteRule(rule.id)}
                      style={styles.actionButton}
                    >
                      <Trash2 size={18} color="#E74C3C" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={[styles.ruleTitle, !rule.enabled && styles.ruleTitleDisabled]}>
                  {rule.title}
                </Text>
                <Text style={[styles.ruleDescription, !rule.enabled && styles.ruleDescriptionDisabled]}>
                  {rule.description}
                </Text>
                <View style={styles.ruleFooter}>
                  <View style={[styles.toggle, rule.enabled && styles.toggleActive]}>
                    <View style={[styles.toggleIndicator, rule.enabled && styles.toggleIndicatorActive]} />
                  </View>
                  <Text style={styles.ruleStatus}>
                    {rule.enabled ? 'Active' : 'Inactive'}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Add Rule Button */}
        <TouchableOpacity style={styles.addRuleButton} onPress={openAddModal}>
          <Plus size={24} color="#FFFFFF" />
          <Text style={styles.addRuleText}>Add New Rule</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add/Edit Rule Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingRule ? 'Edit Rule' : 'Add New Rule'}
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <X size={24} color="#2C3E50" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Rule title"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.categoryLabel}>Category</Text>
            <View style={styles.categoryOptions}>
              {(['discipline', 'productivity', 'health'] as const).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryOption,
                    formData.category === cat && styles.categoryOptionActive,
                    { borderColor: getCategoryColor(cat) }
                  ]}
                  onPress={() => setFormData({ ...formData, category: cat })}
                >
                  <Text style={[
                    styles.categoryOptionText,
                    formData.category === cat && { color: getCategoryColor(cat) }
                  ]}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={saveRule}>
              <Text style={styles.saveButtonText}>
                {editingRule ? 'Update Rule' : 'Create Rule'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  rulesContainer: {
    paddingHorizontal: 20,
  },
  ruleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ruleDisabled: {
    opacity: 0.6,
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  ruleActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  ruleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  ruleTitleDisabled: {
    color: '#95A5A6',
  },
  ruleDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 12,
  },
  ruleDescriptionDisabled: {
    color: '#BDC3C7',
  },
  ruleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#4CAF50',
  },
  toggleIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  toggleIndicatorActive: {
    transform: [{ translateX: 20 }],
  },
  ruleStatus: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  addRuleButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    margin: 20,
    gap: 8,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addRuleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 10,
  },
  categoryOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  categoryOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  categoryOptionActive: {
    backgroundColor: '#F0F0F0',
  },
  categoryOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});