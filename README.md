# Music Education Scheduler

A comprehensive web application designed to help music teachers, schools, and studios efficiently manage lesson scheduling, student progress tracking, and administrative tasks. This system streamlines the scheduling process, automates reminders, facilitates resource sharing, and provides valuable analytics.

## Features

### User Management
- Administrator tools for managing teacher and student accounts
- Teacher profile management with specialties and qualifications
- Student profiles with progress tracking
- Flexible role-based access control

### Scheduling
- Intuitive calendar interface for booking lessons
- Teacher availability management
- Recurring lesson scheduling
- Easy rescheduling and cancellation workflows
- External calendar synchronization (Google, iCal, Outlook)

### Notifications
- Automated booking confirmations
- Lesson reminders
- Real-time notifications for schedule changes
- Multi-channel delivery (email, SMS, in-app)

### Lesson Management
- Attendance tracking
- Student progress notes and evaluations
- Resource sharing for practice materials
- Comprehensive lesson history

### Payments
- Flexible pricing models for different lesson types
- Secure online payment processing
- Payment status tracking
- Financial reporting

### Analytics
- Attendance statistics
- Peak booking time analysis
- Teacher performance metrics
- Student retention insights

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux Toolkit for state management
- Material-UI components
- FullCalendar.js for calendar functionality
- Formik with Yup for form validation
- Axios for HTTP requests

### Backend
- Node.js with Express
- JWT authentication with refresh tokens
- Joi/Yup for input validation
- Bull/Redis for background job processing (reminders)

### Database
- PostgreSQL for primary data storage
- Redis for caching and job queues

### Infrastructure
- Docker containerization
- AWS/GCP hosting options
- GitHub Actions for CI/CD
- Sentry for error tracking

### Third-party Integrations
- Stripe for payment processing
- SendGrid for email notifications
- Twilio for SMS notifications
- Google Calendar API for calendar sync
- AWS S3/GCP Storage for file storage

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v14+)
- Redis (v6+)
- Git

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/dxaginfo/music-education-scheduler-20250625.git
   cd music-education-scheduler-20250625
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Configure environment variables:
   ```bash
   # In the server directory
   cp .env.example .env
   # Edit .env with your database credentials and API keys
   ```

4. Set up the database:
   ```bash
   # In the server directory
   npm run db:migrate
   npm run db:seed  # Optional: adds sample data
   ```

5. Start the development servers:
   ```bash
   # Start backend server (from server directory)
   npm run dev

   # Start frontend server (from client directory)
   npm start
   ```

6. Access the application:
   - Backend API: http://localhost:5000
   - Frontend: http://localhost:3000

### Docker Setup

1. Build and start containers:
   ```bash
   docker-compose up -d
   ```

2. Access the application:
   - Application: http://localhost:3000
   - API: http://localhost:5000

## Deployment

### Production Build

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Configure production environment variables for the server

3. Start the production server:
   ```bash
   cd server
   npm run start:prod
   ```

### Cloud Deployment

Detailed deployment instructions for AWS and GCP are available in the [deployment documentation](docs/deployment.md).

## Project Structure

```
music-education-scheduler/
├── client/                # React frontend
│   ├── public/            # Static files
│   └── src/               # React source code
│       ├── components/    # Reusable UI components
│       ├── hooks/         # Custom React hooks
│       ├── pages/         # Page components
│       ├── redux/         # Redux state management
│       ├── services/      # API service integration
│       └── utils/         # Utility functions
│
├── server/                # Node.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── db/                # Database migrations and models
│   ├── middleware/        # Express middleware
│   ├── routes/            # API route definitions
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
│
├── docs/                  # Documentation
└── docker-compose.yml     # Docker compose configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- FullCalendar.js for the excellent calendar component
- The React and Node.js communities for their invaluable resources