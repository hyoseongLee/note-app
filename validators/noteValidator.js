const { body, param } = require('express-validator');

const noteIdValidator = [
  param('id')
    .isInt().withMessage('숫자가 아닙니다.')
    .notEmpty().withMessage('노트 ID가 필요합니다.')
];

const noteValidator = [
  body('title')
    .isString().withMessage('문자열이 아닙니다.')
    .notEmpty().withMessage('제목은 필수 입력 항목입니다.')
    .isLength({ max: 100 }).withMessage('제목은 최대 100자까지 입력 가능합니다.')
];

module.exports = { noteIdValidator, noteValidator };
