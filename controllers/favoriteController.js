const db = require('../database/connect/mariadb');

/** 즐겨찾기 조회 */
const getFavorites = (req, res) => {
  const { id: memberId } = req.member;

  const query = 'select n.title, n.description, n.tag, n.created_at, n.updated_at from favorite f join note n on n.id = f.note_id where f.member_id = ?';
  const values = [memberId];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send('DB SELECT 쿼리 에러');
    }
    
    if (!results.length) {
      return res.status(404).json({
        message: '즐겨찾기 된 노트가 존재하지 않습니다.'
      });
    }

    return res.status(200).json(results);
  });
};

/** 즐겨찾기 추가 */
const addFavorite = (req, res) => {
  const { id: memberId } = req.member;
  const { id: noteId } = req.params;

  console.log(noteId);
  const query = 'insert into favorite (member_id, note_id) values (?, ?)';
  const values = [memberId, noteId];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send('DB INSERT 쿼리 에러');
    }
    
    if (!results.affectedRows) {
      return res.status(500).json({
        message: '즐겨찾기 추가에 실패했습니다.'
      });
    }

    return res.status(201).json({
      message: '즐겨찾기 추가에 성공했습니다.'
    });
  });
};

/** 즐겨찾기 삭제 */
const deleteFavorite = (req, res) => {
  const { id: memberId } = req.member;
  const { id: noteId } = req.params;

  const query = 'delete from favorite where member_id = ? and note_id = ?';
  const values = [memberId, noteId];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send('DB DELETE 쿼리 에러');
    }
    
    if (!results.affectedRows) {
      return res.status(500).json({
        message: '즐겨찾기 삭제에 실패했습니다.'
      });
    }

    return res.status(200).json({
      message: '즐겨찾기 삭제에 성공했습니다.'
    });
  });
};

module.exports = { getFavorites, addFavorite, deleteFavorite }