const db = require('../database/connect/mariadb');

/** 노트 전체 조회 */
const getNotes = (req, res) => {
  const { id: memberId } = req.member;
  const query = 'select * from note where member_id = ?';
  const values = [memberId];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send('DB SELECT 쿼리 에러');
    }

    if (!results.length) {
      return res.status(404).json({
        message: '노트가 하나도 없습니다!'
      })
    }

    return res.status(200).json(results);
  });
};

/** 노트 개별 조회 */
const getNote = (req, res) => {
  const { id: memberId } = req.member;
  const { id } = req.params;

  const query = 'select * from note where member_id = ? and id = ?';
  const values = [memberId, id];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send('DB SELECT 쿼리 에러');
    }
    
    if (!results.length) {
      return res.status(404).json({
        message: `${id}번 노트는 존재하지 않습니다.`
      });
    }

    return res.status(200).json(results[0]);
  });
};

/** 노트 생성 */
const createNote = (req, res) => {
  const { id: memberId } = req.member;
  const { title } = req.body;

  const description = req.body.description || '';
  const tag = req.body.tag || '';

  const query = 'insert into note (member_id, title, description, tag) values (?, ?, ?, ?)';
  const values = [memberId, title, description, tag];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send('DB INSERT 쿼리 에러');
    }

    if (!results.affectedRows) {
      return res.status(500).json({
        message: '노트 생성에 실패했습니다. (서버 오류)'
      });
    }

    return res.status(201).json({
      message: '노트가 생성되었습니다!'
    });
  });
};

/** 노트 개별 수정 */
const updateNote = (req, res) => {
  const { id: memberId } = req.member;
  const { id } = req.params;

  const title = req.body.title || '';
  const description = req.body.description || '';
  const tag = req.body.tag || '';

  const updateQuery= 'update note set title = ?, description = ?, tag = ? where member_id = ? and id = ?';
  const values = [title, description, tag, memberId, id];

  db.query(updateQuery, values, (err, results) => {
    if (err) {
      return res.status(500).send('DB UPDATE 쿼리 에러');
    }

    if (!results.affectedRows) {
      return res.status(404).json({
        message: `${id}번 노트는 존재하지 않습니다.`
      });
    } 
    
    return res.status(200).json({
        message: `${id}번 노트가 수정되었습니다.`
    });
  });
};

/** 노트 전체 삭제 */
const deleteNotes = (req, res) => {
  const { id: memberId } = req.member;

  const deleteQuery = 'delete from note where member_id = ?';
  const values = [memberId];

  db.query(deleteQuery, values, (err, results) => {
    if (err) {
      return res.status(500).send('DB DELETE 쿼리 에러');
    }
    
    if (!results.affectedRows) {
      return res.status(404).json({
        message: '삭제할 노트가 없습니다.'
      });
    } 
    
    return  res.status(200).json({
        message: `모든 노트가 삭제되었습니다.`
    });
  });
};

/** 노트 개별 삭제 */
const deleteNote = (req, res) => {
  const { id: memberId } = req.member;
  const { id } = req.params;

  const deleteQuery = `delete from note where member_id = ? and id = ?`;
  const values = [memberId, id];

  db.query(deleteQuery, values, (err, results) => {
    if (err) {
      return res.status(500).send('DB DELETE 쿼리 에러');
    }
    
    if (!results.affectedRows) {
      return res.status(404).json({
        message: `${id}번 노트는 존재하지 않습니다.`
      });
    }
    return res.status(200).json({
        message: `${id}번 노트가 삭제되었습니다.`
    });
  });
};

module.exports = { getNotes, getNote, createNote, updateNote, deleteNote, deleteNotes };