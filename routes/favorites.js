const express = require('express');
const router = express.Router();
const db = require('../database/connect/mariadb');
router.use(express.json());

// 즐겨찾기 API
router
  .get('/', (req, res) => { // 즐겨찾기 조회
    const { memberId } = req.body;
    const query = `select n.title, n.description, n.tag, n.createdAt, n.updatedAt
                  from favorite f
                  join note n on n.id = f.note_id
                  where f.member_id = '${memberId}'`;

    if (!memberId) {
      return res.status(401).json({
        message: '로그인이 필요한 작업입니다.'
      });
    }

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send('DB SELECT 쿼리 에러');
      }
      
      if (!results.length) {
        res.status(404).json({
          message: '즐겨찾기 된 노트가 존재하지 않습니다.'
        });
      } else {
        res.status(200).json(results);
      }
    });
  })
  .post('/add/:id', (req, res) => { // 즐겨찾기 추가
    const { memberId } = req.body;
    const noteId = parseInt(req.param.id);
    const query = `insert into favorite (member_id, note_id) values ('${memberId}', ${noteId})`;
    
    if (!memberId) {
      return res.status(401).json({
        message: '로그인이 필요한 작업입니다.'
      });
    }

    if (!noteId) {
      return res.status(400).json({
        message: '즐겨찾기 추가할 노트 ID가 필요한 작업입니다.'
      });
    }

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send('DB INSERT 쿼리 에러');
      }
      
      if (!results.affectedRows) {
        res.status(500).json({
          message: '즐겨찾기 추가에 실패했습니다.'
        });
      } else {
        res.status(201).json({
          message: '즐겨찾기 추가에 성공했습니다.'
        });
      }
    });
  })
  .delete('/delete/:id', (req, res) => { // 즐겨찾기 삭제
    const { memberId } = req.body;
    const noteId = parseInt(req.query.id);
    const query = `delete from favorite where member_id = '${memberId}' and note_id = ${noteId}`;
    
    if (!memberId) {
      return res.status(401).json({
        message: '로그인이 필요한 작업입니다.'
      });
    }

    if (!noteId) {
      return res.status(400).json({
        message: '즐겨찾기 삭제할 노트 ID가 필요한 작업입니다.'
      });
    }

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send('DB DELETE 쿼리 에러');
      }
      
      if (!results.affectedRows) {
        res.status(500).json({
          message: '즐겨찾기 삭제에 실패했습니다.'
        });
      } else {
        res.status(200).json({
          message: '즐겨찾기 삭제에 성공했습니다.'
        });
      }
    });
  });

  module.exports = router;
