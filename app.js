const express = require('express');
const db = require('./mariadb');
const app = express();
const port = 3000;

db.connect((err) => {
  if (err) {
    console.log('DB 연결 실패');
  } else {
    console.log('DB 연결 성공');
  }
});

app.use(express.json());
app.listen(port, () => {
  console.log(`${port}포트에서 서버 실행 중`);
});

// 노트 전체 조회
app.get('/notes', (req, res) => {
  const query = 'select * from note';

  db.query(query, (err, results) => {
    if (err) {
      res.send('DB SELECT 쿼리 에러');
    }

    if (!results.length) {
      res.json({
        message: '노트가 하나도 없습니다!'
      })
    } else {
      res.json(results);
    }
  });
});

// 노트 개별 조회
app.get('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const query = `select * from note where id = ${id}`;

  db.query(query, (err, results) => {
    if (err) {
      res.send('DB SELECT 쿼리 에러');
    }
    
    if (!results.length) {
      res.json({
        message: '해당 노트는 존재하지 않습니다.'
      })
    } else {
      res.json(results[0]);
    }
  });
});

// 노트 생성
app.post('/notes', (req, res) => {
  const { title, description, tag } = req.body;
  const query = `insert into note (member_id, title, description, tag) values (1, '${title}', '${description}', '${tag}')`;

  db.query(query, (err, results) => {
    if (err) {
      res.send('DB INSERT 쿼리 에러');
    } 

    if (!results.affectedRows) {
      res.json({
        message: '노트가 생성되지 않았습니다.'
      });
    } else {
      res.json({
        message: '노트가 생성되었습니다!'
      });
    }
  });
});

// 노트 수정
app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, tag } = req.body;

  const updateQuery= `update note set title = '${title}', description = '${description}', tag = '${tag}' where id = ${id}`;

  db.query(updateQuery, (err, results) => {
    if (err) {
      res.send('DB UPDATE 쿼리 에러');
    }

    if (!results.affectedRows) {
      res.json({
        message: '해당 노트는 존재하지 않습니다.'
      });
    } else {
      res.json({
        message: '노트가 수정되었습니다!'
      });
    }
  });
});

// 노트 개별 삭제
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deleteQuery = `delete from note where id = ${id}`;

  db.query(deleteQuery, (err, results) => {
    if (err) {
      res.send('DB DELETE 쿼리 에러');
    }
    
    if (!results.affectedRows) {
      res.json({
        message: '해당 노트는 존재하지 않습니다.'
      });
    } else {
      res.json({
        message: `${id}번 노트가 삭제되었습니다.`
      });
    }
  });
});

// 노트 전체 삭제
app.delete('/notes', (req, res) => {
  const deleteQuery = `delete from note`;

  db.query(deleteQuery, (err, results) => {
    if (err) {
      res.send('DB DELETE 쿼리 에러');
    }
    
    if (!results.affectedRows) {
      res.json({
        message: '이미 모든 노트가 삭제된 상태입니다.'
      });
    } else {
      res.json({
        message: `모든 노트가 삭제되었습니다.`
      });
    }
  });
});
