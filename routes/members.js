const express = require('express');
const router = express.Router();
const db = require('../database/connect/mariadb');
router.use(express.json());

// 회원 API
router
  .post('/join', (req, res) => { // 회원 가입
    const { id, password, name } = req.body;

    if (!id || !password || !name) {
      return res.status(400).json({
        message: '입력값을 다시 확인해주세요.'
      })
    }

    const insertQuery = `insert into member (id, password, name) values ('${id}', '${password}', '${name}')`;

    db.query(insertQuery, (err, results) => {
      if (err) {
        return res.status(500).send('DB INSERT 쿼리 에러');
      }
      
      if (!results.affectedRows) {
        res.status(500).json({
          message: '회원 가입에 실패했습니다.'
        });
      } else {
        res.status(201).json({
          message: `회원 가입에 성공했습니다.`
        });
      }
    });
  });

module.exports = router;