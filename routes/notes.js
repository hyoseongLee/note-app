const express = require('express');
const router = express.Router();
const db = require('../database/connect/mariadb');
router.use(express.json());

// 노트 API
router
  .route('/')
  .get((req, res) => { // 노트 전체 조회
    const { memberId } = req.body;
    const query = `select * from note where member_id = '${memberId}'`;

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
          message: '노트가 하나도 없습니다!'
        })
      } else {
        res.status(200).json(results);
      }
    });
  })
  .post((req, res) => { // 노트 생성
    const { memberId } = req.body;
    const { title, description, tag } = req.body;
    const query = `insert into note (member_id, title, description, tag) values ('${memberId}', '${title}', '${description}', '${tag}')`;

    if (!memberId) {
      return res.status(401).json({
        message: '로그인이 필요한 작업입니다.'
      });
    }

    if (!title) {
      res.status(400).json({
        message: '제목은 필수값입니다.'
      });
    }

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send('DB INSERT 쿼리 에러');
      }

      if (results.affectedRows) {
        res.status(201).json({
          message: '노트가 생성되었습니다!'
        });
      }
    });
  })
  .delete((req, res) => { // 노트 전체 삭제
    const { memberId } = req.body;
    const deleteQuery = `delete from note where member_id = '${memberId}'`;

    if (!memberId) {
      return res.status(401).json({
        message: '로그인이 필요한 작업입니다.'
      });
    }

    db.query(deleteQuery, (err, results) => {
      if (err) {
        return res.status(500).send('DB DELETE 쿼리 에러');
      }
      
      if (!results.affectedRows) {
        res.status(400).json({
          message: '이미 모든 노트가 삭제된 상태입니다.'
        });
      } else {
        res.status(200).json({
          message: `모든 노트가 삭제되었습니다.`
        });
      }
    });
  });

router
  .route('/:id')
  .get((req, res) => { // 노트 개별 조회
    const { memberId } = req.body;
    const id = parseInt(req.params.id);
    const query = `select * from note where member_id = '${memberId}' and id = ${id}`;

    if (!memberId) {
      return res.status(401).json({
        message: '로그인이 필요한 작업입니다.'
      });
    }

    if (!id) {
      return res.status(400).json({
        message: '조회할 노트 ID가 필요한 작업입니다.'
      });
    }

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send('DB SELECT 쿼리 에러');
      }
      
      if (!results.length) {
        res.status(404).json({
          message: `${id}번 노트는 존재하지 않습니다.`
        });
      } else {
        res.status(200).json(results[0]);
      }
    });
  })
  .put((req, res) => { // 노트 개별 수정
    const { memberId } = req.body;
    const id = parseInt(req.params.id);

    const title = req.body.title || '';
    const description = req.body.description || '';
    const tag = req.body.tag || '';

    const updateQuery= `update note set title = '${title}', description = '${description}', tag = '${tag}' where member_id = '${memberId}' and id = ${id}`;

    if (!memberId) {
      return res.status(401).json({
        message: '로그인이 필요한 작업입니다.'
      });
    }

    if (!id) {
      return res.status(400).json({
        message: '수정할 노트 ID가 필요한 작업입니다.'
      });
    }

    db.query(updateQuery, (err, results) => {
      if (err) {
        return res.status(500).send('DB UPDATE 쿼리 에러');
      }

      if (!results.affectedRows) {
        res.status(404).json({
          message: `${id}번 노트는 존재하지 않습니다.`
        });
      } else {
        res.status(200).json({
          message: `${id}번 노트가 수정되었습니다.`
        });
      }
    });
  })
  .delete((req, res) => { // 노트 개별 삭제
    const { memberId } = req.body;
    const id = parseInt(req.params.id);
    const deleteQuery = `delete from note where member_id = '${memberId}' and id = ${id}`;

    if (!memberId) {
      return res.json({
        message: '로그인이 필요한 작업입니다.'
      });
    }

    if (!id) {
      return res.status(400).json({
        message: '삭제할 노트 ID가 필요한 작업입니다.'
      });
    }

    db.query(deleteQuery, (err, results) => {
      if (err) {
        return res.status(500).send('DB DELETE 쿼리 에러');
      }
      
      if (!results.affectedRows) {
        res.status(404).json({
          message: `${id}번 노트는 존재하지 않습니다.`
        });
      } else {
        res.status(200).json({
          message: `${id}번 노트가 삭제되었습니다.`
        });
      }
    });
  });

module.exports = router;