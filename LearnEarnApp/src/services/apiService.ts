import axios from 'axios';

// Update this URL to match your backend server
const BASE_URL = 'http://localhost:8080';

export interface User {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'company';
}

export interface Project {
  id?: number;
  company_id: number;
  title: string;
  description: string;
  deadline: string;
  attachment?: string;
}

export interface Submission {
  student_id: number;
  project_id: number;
  file_link?: string;
}

class ApiService {
  private api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Register a new user
  async register(userData: User) {
    try {
      const response = await this.api.post('/register', userData);
      return response.data;
    } catch (error) {
      throw new Error('Registration failed');
    }
  }

  // Get all projects
  async getProjects() {
    try {
      const response = await this.api.get('/projects');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch projects');
    }
  }

  // Publish a new project (for companies)
  async publishProject(projectData: FormData) {
    try {
      const response = await this.api.post('/publish', projectData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to publish project');
    }
  }

  // Submit project (for students)
  async submitProject(submissionData: FormData) {
    try {
      const response = await this.api.post('/submit', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to submit project');
    }
  }

  // Get file URL for uploaded attachments
  getFileUrl(filename: string) {
    return `${BASE_URL}/${filename}`;
  }
}

export const apiService = new ApiService();