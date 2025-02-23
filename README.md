# memo-app

``` sql
-- 기본 테이블
create table member (
  id varchar(20) primary key,
  password varchar(20) not null,
  name varchar(100) not null
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
  member_id int,
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
