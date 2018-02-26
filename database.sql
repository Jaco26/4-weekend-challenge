CREATE TABLE pictures
(
	id SERIAL PRIMARY KEY,
	url VARCHAR,
	synopsis VARCHAR,
	up_votes INT,
	view_count INT
);

CREATE TABLE comments
(
	id SERIAL PRIMARY KEY,
	comment VARCHAR
);

CREATE TABLE users
(
	id SERIAL PRIMARY KEY,
	username VARCHAR
);


CREATE TABLE pictures_comments_users
(
	id SERIAL PRIMARY KEY,
	picture_id INT references pictures,
	comment_id INT references comments,
	user_id INT references users
);
 