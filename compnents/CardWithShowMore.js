import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const CardWithShowMore = ({ data = [], initialVisibleCount = 6 }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollView>
      <View>
        {data.map((item, index) => {
          const itemKeys = Object.keys(item);
          const visibleKeys = expanded ? itemKeys : itemKeys.slice(0, initialVisibleCount);

          return (
            <View style={styles.card} key={index}>
              {visibleKeys.map((key) => (
                <View style={styles.cell} key={key}>
                  <Text style={styles.label}>{key}</Text>
                  <Text style={styles.value}>{item[key]}</Text>
                </View>
              ))}
              <View style={styles.showMoreContainer}>
                {!expanded && itemKeys.length > initialVisibleCount && (
                  <TouchableOpacity onPress={() => setExpanded(true)}>
                    <Text style={styles.showMore}>Show More</Text>
                  </TouchableOpacity>
                )}
                {expanded && (
                  <TouchableOpacity onPress={() => setExpanded(false)}>
                    <Text style={styles.showMore}>Show Less</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    color: '#666',
  },
  showMoreContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  showMore: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default CardWithShowMore;