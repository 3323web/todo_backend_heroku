import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';

// 환경변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB 연결 설정
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/study_todo';

// 서버 시작 (MongoDB 연결과 독립적으로)
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  
  // MongoDB 연결 (비동기)
  if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
      .then(() => {
        console.log('MongoDB 연결 성공');
      })
      .catch((error) => {
        console.error('MongoDB 연결 실패:', error);
        console.error('서버는 계속 실행되지만 데이터베이스 기능은 사용할 수 없습니다.');
      });
  } else {
    console.warn('MONGODB_URI가 설정되지 않았습니다.');
  }
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
