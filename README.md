# 📝Note App

사이드 프로젝트로 간단하게 만들어보는 노트 관리 API

## 📌 기능

### 1. 회원 관리 (Members)

- 회원가입 (`POST` /join)

### 2. 노트 관리 (Notes)

- 노트 생성 (`POST` /notes)
- 노트 전체 조회 (`GET` /notes)
- 전체 노트 삭제 (`DELETE` /notes)

- 노트 개별 조회 (`GET` /notes/:id)
- 노트 수정 (`PUT` /notes/:id)
- 노트 삭제 (`DELETE` /notes/:id)

### 3. 즐겨찾기 관리 (Favorites)

- 즐겨찾기 목록 조회 (`GET` /favorites)
- 즐겨찾기 추가 (`POST` /favorites/add/:id)
- 즐겨찾기 삭제 (`DELETE` /favorites/delete/:id)

***추후 계속 추가 및 수정 예정***

## 🛠️ 기술 스택

- **Backend**: Node.js (Express)
- **Database**: MariaDB

## ⚡ DB 테이블 설정
``` sql
-- 기본 테이블
create table member (
  id varchar(20) primary key,
  password varchar(30) not null,
  name varchar(30) not null
);

create table note (
  id int primary key auto_increment,
  member_id varchar(20),
  title varchar(100) not null,
  description text,
  tag varchar(50),
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp,
  foreign key (member_id) references member(id)
    on delete cascade
    on update cascade
);

create table favorite (
  id int primary key auto_increment,
  member_id varchar(20),
  note_id int,
  foreign key (member_id) references member(id)
    on delete cascade
    on update cascade,
  foreign key (note_id) references note(id)
    on delete cascade
    on update cascade
);

-- 테스트용 데이터
insert into member (id, password, name) values ('testUser1', 'pwd1', '테스트유저1');
insert into member (id, password, name) values ('testUser2', 'pwd2', '테스트유저2');
insert into member (id, password, name) values ('testUser3', 'pwd3', '테스트유저3');

insert into note (member_id, title, description, tag) values ('testUser1', '유저1 제목1', '유저1 노트1 내용', '#유저1_태그1');
insert into note (member_id, title, description, tag) values ('testUser2', '유저2 제목1', '유저2 노트1 내용', '#유저2_태그1');
insert into note (member_id, title, description, tag) values ('testUser2', '유저2 제목2', '유저2 노트2 내용', '#유저2_태그2');
insert into note (member_id, title, description, tag) values ('testUser3', '유저3 제목1', '유저3 노트1 내용', '#유저3_태그1');
insert into note (member_id, title, description, tag) values ('testUser3', '유저3 제목2', '유저3 노트2 내용', '#유저3_태그2');
insert into note (member_id, title, description, tag) values ('testUser3', '유저3 제목3', '유저3 노트3 내용', '#유저3_태그3');

// hyoseong 포크하였음.