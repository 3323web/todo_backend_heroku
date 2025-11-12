import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';

// 환경변수 로드
dotenv.config();

const app = express();

// MongoDB 연결 설정
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/study_todo';
const PORT = process.env.PORT || 5000;

// MongoDB 연결
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB 연결 성공');
    
    // 서버 시작
    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
      console.log(`MongoDB URI: ${MONGODB_URI}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB 연결 실패:', error);
    process.exit(1);
  });

// CORS 설정
app.use(cors({
  origin: '*', // 개발 환경에서는 모든 origin 허용 (프로덕션에서는 특정 origin 지정 권장)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// 기본 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Study Todo Backend API' });
});

// 할일 라우터
app.use('/api', todoRoutes);
