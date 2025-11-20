import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiService} from '../services/apiService';

interface SubmitScreenProps {
  navigation: any;
}

export default function SubmitScreen({navigation}: SubmitScreenProps) {
  const [studentId, setStudentId] = useState('1'); // Demo user ID
  const [projectId, setProjectId] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(result[0]);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker
      } else {
        Alert.alert('Error', 'Failed to select file');
      }
    }
  };

  const handleSubmit = async () => {
    if (!projectId) {
      Alert.alert('Error', 'Please enter project ID');
      return;
    }

    if (!selectedFile) {
      Alert.alert('Error', 'Please select a file to submit');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('student_id', studentId);
      formData.append('project_id', projectId);
      formData.append('file_link', {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.name,
      } as any);

      await apiService.submitProject(formData);
      Alert.alert('Success', 'Project submitted successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setProjectId('');
            setSelectedFile(null);
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Icon name="upload" size={48} color="#7b8cff" />
          <Text style={styles.title}>Submit Your Work</Text>
          <Text style={styles.subtitle}>
            Upload your completed project file
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Project ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter project ID"
            value={projectId}
            onChangeText={setProjectId}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Select File</Text>
          <TouchableOpacity style={styles.fileSelector} onPress={selectFile}>
            <View style={styles.fileSelectorContent}>
              <Icon
                name={selectedFile ? 'insert-drive-file' : 'cloud-upload'}
                size={32}
                color={selectedFile ? '#4CAF50' : '#7b8cff'}
              />
              <Text style={styles.fileSelectorText}>
                {selectedFile ? selectedFile.name : 'Tap to select file'}
              </Text>
              {selectedFile && (
                <Text style={styles.fileSize}>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.submitButton,
              {opacity: loading || !projectId || !selectedFile ? 0.6 : 1},
            ]}
            onPress={handleSubmit}
            disabled={loading || !projectId || !selectedFile}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Icon name="send" size={20} color="#fff" />
                <Text style={styles.submitButtonText}>Submit Project</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Submission Guidelines</Text>
          <Text style={styles.infoText}>
            • Make sure your file is complete and well-documented{'\n'}
            • Supported formats: PDF, DOC, ZIP, etc.{'\n'}
            • Maximum file size: 50MB{'\n'}
            • Include your name and project details in the file
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  fileSelector: {
    backgroundColor: '#f8f9ff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#e0e6ff',
    borderStyle: 'dashed',
  },
  fileSelectorContent: {
    alignItems: 'center',
  },
  fileSelectorText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  fileSize: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#7b8cff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});