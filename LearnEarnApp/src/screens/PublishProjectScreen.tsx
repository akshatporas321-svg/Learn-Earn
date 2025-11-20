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
import {apiService} from '../services/apiService';

interface PublishProjectScreenProps {
  navigation: any;
}

export default function PublishProjectScreen({
  navigation,
}: PublishProjectScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const companyId = '1'; // Demo company ID

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

  const handlePublish = async () => {
    if (!title || !description || !deadline) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('company_id', companyId);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('deadline', deadline);
      
      if (selectedFile) {
        formData.append('attachment', {
          uri: selectedFile.uri,
          type: selectedFile.type,
          name: selectedFile.name,
        } as any);
      }

      await apiService.publishProject(formData);
      Alert.alert('Success', 'Project published successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to publish project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Icon name="work" size={48} color="#7b8cff" />
          <Text style={styles.title}>Publish New Project</Text>
          <Text style={styles.subtitle}>
            Create a project for students to work on
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Project Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter project title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the project requirements, goals, and deliverables"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Deadline *</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={deadline}
            onChangeText={setDeadline}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Attachment (Optional)</Text>
          <TouchableOpacity style={styles.fileSelector} onPress={selectFile}>
            <View style={styles.fileSelectorContent}>
              <Icon
                name={selectedFile ? 'insert-drive-file' : 'cloud-upload'}
                size={32}
                color={selectedFile ? '#4CAF50' : '#7b8cff'}
              />
              <Text style={styles.fileSelectorText}>
                {selectedFile ? selectedFile.name : 'Tap to attach file'}
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
              styles.publishButton,
              {opacity: loading || !title || !description || !deadline ? 0.6 : 1},
            ]}
            onPress={handlePublish}
            disabled={loading || !title || !description || !deadline}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Icon name="publish" size={20} color="#fff" />
                <Text style={styles.publishButtonText}>Publish Project</Text>
              </>
            )}
          </TouchableOpacity>
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
  textArea: {
    height: 120,
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
  publishButton: {
    backgroundColor: '#7b8cff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});